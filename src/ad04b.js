/* --- Day 4: Camp Cleanup --- */

import { readFile } from './helpers/index.js';

const hasFullOverlap = ([elveA, elveB]) => {
  if (!elveA || !elveB) return 0;
  return !(elveA[0] > elveB[1] || elveA[1] < elveB[0]);
};

const elvePairs = readFile('./input/input04.txt', '\n').map(item =>
  item.split(',').map(i => i.split('-').map(Number))
);
const overlappingElvePairs = elvePairs.filter(hasFullOverlap);
console.log('The amount of partly overlapping pairs is', overlappingElvePairs.length);
