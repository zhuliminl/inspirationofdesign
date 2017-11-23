import _ from 'lodash';
import './style.css';
import Icon from './picture.png';
import Data from './data.xml';

import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'xiaoshitoiu', 'I hear you get bad luck recently, is anything all right?']);
  element.classList.add('hello');
  btn.innerHTML = 'Click Me';
  btn.addEventListener('click', printMe);

  let myIcon = new Image();
  myIcon.src = Icon;

 // nothing
  element.appendChild(myIcon);
  element.appendChild(btn);

  console.log(Data);

  return element;
}

document.body.appendChild(component());
