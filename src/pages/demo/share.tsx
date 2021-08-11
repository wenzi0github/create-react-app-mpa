import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from '@/common/components/head';
import Foot from '@/common/components/foot';

const Share = () => {
  useEffect(() => {
    document.title = 'share';
    // console.log(document.title);
  }, []);
  return (
    <div className="index-page">
      <h1>share page</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Head />
    <Share />
    <Foot />
  </React.StrictMode>,
  document.getElementById('root'),
);
