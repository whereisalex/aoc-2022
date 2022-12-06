/* --- Day 6: Tuning Trouble --- */

import { readFile } from './helpers/index.js';

const dataStream = readFile('./input/input06.txt', '\n')[0].split('');

const findMarker = requiredLength => {
  let characterProcessCount = -1;
  let current = [];

  for (let i = 0; i < dataStream.length; i++) {
    const duplicateIndex = current.indexOf(dataStream[i]);
    if (duplicateIndex < 0) {
      current.push(dataStream[i]);
      if (current.length === requiredLength) {
        characterProcessCount = i + 1;
        break;
      }
    } else {
      current = [...current.slice(duplicateIndex + 1), dataStream[i]];
    }
  }
  return characterProcessCount;
};

console.log('The start-of-package marker is at', findMarker(4));
console.log('The start-of-message marker is at', findMarker(14));
