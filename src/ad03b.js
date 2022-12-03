/* --- Day 3: Rucksack Reorganization --- */

import { readFile } from './helpers/index.js';

const getPrio = letter => (letter.charCodeAt(0) - 38) % 58;
const getCommon = ([elveA, elveB, elveC]) =>
  elveA.split('').filter(item => elveB.indexOf(item) >= 0 && elveC.indexOf(item) >= 0)[0];

const groupElves = elves => {
  const results = [];
  while (elves.length > 2) results.push(getPrio(getCommon(elves.splice(0, 3))));
  return results;
};

const elves = groupElves(readFile('./input/input03.txt', '\n'));
const score = elves.reduce((a, c) => a + c, 0);
console.log('The sum is', score);
