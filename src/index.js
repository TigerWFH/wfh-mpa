// import './tools/tool';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import MyApp from './pages/Home';
import About from './pages/About';
window.addEventListener('hashchange', function (e) {
  console.log('hashchange===>', e);
});
window.addEventListener('popstate', function (e) {
  console.log('popstate======>', e);
});
window.addEventListener(
  'focusout',
  function (event) {
    console.log(
      'focusout------event======>',
      event.target,
      event.currentTarget,
      event
    );
    if (event.target && event.target.placeholder) {
      console.log('placeholder====>', event.target.placeholder);
    }
  },
  false
);

window.addEventListener('copy', function (event) {
  // 可以通过event.clipboardData.setData(format, data)设置剪切板数据
  // 无法读取系统剪切板，只能通过selection获取
  const selection = document.getSelection();
  console.log('copy------event======>', event, selection.toString());
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path="/" element={<MyApp />}></Route>
      <Route path="/about" element={<About />}></Route>
    </Routes>
  </HashRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
