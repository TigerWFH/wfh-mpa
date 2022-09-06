import './tools/toolsv2';
import { network } from './tools/network';
const container = document.getElementById('root');

const body = document.createElement('span');

function getName() {
  console.log('I am click, I am native js');
  network.get('/api/use');
}

body.addEventListener('click', getName, false);
body.addEventListener('click', getName, false);
body.innerHTML = 'I am native js';

const wrapper = document.createElement('div');
wrapper.appendChild(body);
container.appendChild(wrapper);
