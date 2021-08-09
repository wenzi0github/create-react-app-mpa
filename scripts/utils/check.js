/* eslint-disable */
const glob = require('glob');
const fs = require('fs-extra');
const axios = require('axios');
// const copyAllFils = require("./copy");
const getConfigByConfig = require('./getConfig');

const check = async () => {
  const list = glob.sync('src/pages/**/*.*').filter(item => !item.includes('test.ts')); // 获取pages目录中所有的文件

  // console.log(list);
  console.log('>> step 1: glob all pages files');
  const projects = {}; // 本地的项目
  const prevProjects = {}; // 线上改动的项目
  const entries = {}; // 本次要构建的项目

  list.forEach((item) => {
    const [match, project, name] = item.match(/src\/pages\/(.*?)\/(.*?).tsx/) || [null, null, null];

    if (match && project && name && !name.includes('/')) {
      console.log(match, project, name);

      if (!projects[project]) {
        projects[project] = [];
      }
      projects[project].push({
        project,
        name,
        configSrc: `src/pages/${project}/${name}.json`,
        src: `src/pages/${project}/${name}.tsx`,
      });
    }
  });

  try {
    const lastCommitIdFileExist = await fs.pathExists('./currentGrowthCommitId.json');
    const { lastCommitId } = lastCommitIdFileExist
      ? fs.readJSONSync('./currentGrowthCommitId.json')
      : { lastCommitId: '58e9551afb6546edc2a5f664b1c5c2344689a04a' };
    const currentCommitId = process.argv.slice(2)[0] || 'f17635bd129df9498eb27e1d62edf309ee584927';
    console.log('lastCommitId', lastCommitId);
    console.log('currentCommitId', currentCommitId);

    // 文档 https://git.code.oa.com/help/menu/api/repositorys.html#%E8%8E%B7%E5%8F%96%E5%B7%AE%E5%BC%82%E6%96%87%E4%BB%B6%E5%88%97%E8%A1%A8
    const { status, data } = await axios(
      'http://git.code.oa.com/api/v3/projects/news-gh-team%2Fgrowth-h5/repository/compare/changed_files/list',
      {
        params: {
          private_token: 'TQ1DYMRSA4C9DRAFVAF1',
          from: lastCommitId,
          to: currentCommitId,
          per_page: 9999, // 每页返回的数据
        },
        timeout: 30000,
      },
    );
    // data = [
    //     {
    //         old_path: "src/pages/demo/index.json",
    //         new_path: "src/pages/demo/index.json",
    //         a_mode: 33188,
    //         b_mode: 33188,
    //         new_file: false,
    //         renamed_file: false,
    //         deleted_file: false,
    //         additions: 2,
    //         deletions: 2
    //     }
    // ];
    console.log(status, data);

    if (status === 200) {
      data
        .filter((item) => item.new_path.includes('src/pages') || item.old_path.includes('src/pages'))
        .forEach((item) => {
          const file = item.deleted_file ? item.old_path : item.new_path; // 若是删除文件，则使用旧的路径，否则使用文件的新路径
          const [match, project] = file.match(/src\/pages\/(.*?)\//) || [null, null];

          if (match && project) {
            console.log(match, project);

            if (!prevProjects[project]) {
              prevProjects[project] = {
                project,
                src: item,
              };
            }
          }
        });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  for (const key in projects) {
    if (prevProjects[key]) {
      const project = projects[key];
      if (!entries[key]) {
        entries[key] = { projects: [] };
      }
      // {
      //     project,
      //     name,
      //     config: `src/pages/${project}/${project}.json`,
      //     src: `src/pages/${project}/${project}.tsx`
      // }

      project.forEach((page) => {
        console.log(page);
        const config = getConfigByConfig(page.configSrc);

        config.buildPath.split('|').forEach((bitem) => {
          entries[key].projects.push({
            ...page,
            ...{ config, buildPath: bitem },
          });
        });
      });
    }
  }
  console.log('check.entries', JSON.stringify(entries, null, 2));
  console.log('>> step 1: glob all pages files finished');
  return entries;
};
// filter();
// check();
module.exports = check;
