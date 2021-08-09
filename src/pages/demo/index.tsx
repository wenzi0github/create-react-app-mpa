import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from '@/common/components/head';
import Foot from '@/common/components/foot';
import './index.less';

const Index = () => {
  useEffect(() => {
    document.title = 'index';
    // console.log(document.title);
  }, []);
  return (
    <div className="index-page">
      <h1>index page</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Head />
    <Index />
    <Foot />
  </React.StrictMode>,
  document.getElementById('root'),
);
