import './tools/tool';
const container = document.getElementById('root');

const body = document.createElement('span');
body.addEventListener(
  'click',
  function () {
    console.log('I am click, I am native js');
  },
  false
);
body.innerHTML = 'I am native js';

container.appendChild(body);
