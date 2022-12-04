/* --- Day 4: Camp Cleanup --- */

import { readFile } from './helpers/index.js';

const hasPartialOverlap = ([elveA, elveB]) => {
  if (!elveA || !elveB) return 0;
  return (
    (elveA[0] >= elveB[0] && elveA[1] <= elveB[1]) || (elveB[0] >= elveA[0] && elveB[1] <= elveA[1])
  );
};

const elvePairs = readFile('./input/input04.txt', '\n').map(item =>
  item.split(',').map(i => i.split('-').map(Number))
);
const overlappingElvePairs = elvePairs.filter(hasPartialOverlap);
console.log('The amount of fully overlapping pairs is', overlappingElvePairs.length);
