/* --- Day 2: Rock Paper Scissors --- */

import { readFile } from './helpers/index.js';

const outcomes = { X: 0, Y: 3, Z: 6 };
const mapping = { A: { X: 3, Y: 1, Z: 2 }, B: { X: 1, Y: 2, Z: 3 }, C: { X: 2, Y: 3, Z: 1 } };

const play = ([player, outcome]) => {
  if (!player || !outcome) return 0;
  return mapping[player][outcome] + outcomes[outcome];
};

const score = readFile('./input/input02b.txt', '\n')
  .map(item => play(item.split(' ')))
  .reduce((a, c) => a + c, 0);

console.log('The score is', score);
