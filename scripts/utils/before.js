/* eslint-disable */
const chalk = require('react-dev-utils/chalk');
const glob = require('glob');
const path = require('path');
const getConfigByConfig = require('./getConfig');

const noFileMsg = (project) => `start error, the reason may be:\n
1. project enter error, please ensure you right;
2. in pages/${project} has not .tsx file, at least one .tsx fle\n`;

// 在启动和构建之前执行的代码
// 主要用于检查输入的命令和读取配置文件
// feature-h5/card
const beforeFn = async () => {
  const argv = process.argv.slice(2);
  const [project] = typeof argv === 'object' && argv.length ? argv : [''];

  if (project.length) {
    const list = glob.sync(`src/pages/${project}/*.tsx`).filter(item => !item.includes('test.ts')); // 获取pages目录中所有的文件
    if (list.length === 0) {
      console.log(chalk.red(noFileMsg(project)));
      process.exit(1);
    }
    const ss = list
      .map((item) => {
        const { ext, name } = path.parse(item);
        if (ext === '.tsx') {
          const config = getConfigByConfig(`src/pages/${project}/${name}.json`);

          return {
            name,
            project,
            config,
            src: item,
          };
        }
        return null;
      })
      .filter(Boolean);
    return Promise.resolve(ss);
  } else {
    // 命令不正确
    console.log(chalk.red(`please start like: \`npm run start home\`, or \`npm run start --page home\`\n`));
    process.exit(1);
  }
};

module.exports = beforeFn;
