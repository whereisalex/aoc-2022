/* --- Day 3: Rucksack Reorganization --- */

import { readFile } from './helpers/index.js';

const getPriority = letter => (letter.charCodeAt(0) - 38) % 58;

const getPriorityOfDuplicates = content => {
  if (!content.length) return 0;
  let firstHalf = content.splice(content.length / 2);
  return getPriority(firstHalf.filter(item => content.indexOf(item) >= 0)[0]);
};

const score = readFile('./input/input03.txt', '\n')
  .map(item => getPriorityOfDuplicates(item.split('')))
  .reduce((a, c) => a + c, 0);

console.log('The sum is', score);
