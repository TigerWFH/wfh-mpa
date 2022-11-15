import './tools/tool';
import { network } from './tools/network';
const container = document.getElementById('root');

const body0 = document.createElement('span');
body0.className = 'span';
const body2 = document.createElement('span');
body2.className = 'span';

function getName() {
  console.log('I am click, I am native js');
  network.get('/api/use');
}

body0.addEventListener('click', getName, false);
body0.addEventListener('click', getName, false);
body0.innerHTML = 'I am native js<a href=http://localhost:3000/>home</a>';

const wrapper = document.createElement('div');
wrapper.className = 'container';
wrapper.appendChild(body0);
wrapper.appendChild(body2);
container.appendChild(wrapper);
