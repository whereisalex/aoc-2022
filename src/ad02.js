/* --- Day 2: Rock Paper Scissors --- */

import { readFile } from './helpers/index.js';

const mapping = { A: { X: 4, Y: 8, Z: 3 }, B: { X: 1, Y: 5, Z: 9 }, C: { X: 7, Y: 2, Z: 6 } };

const play = ([playerA, playerB]) => (playerA && playerB ? mapping[playerA][playerB] : 0);

const rounds = readFile('./input/input02.txt', '\n').map(item => item.split(' '));
const scores = rounds.map(game => play(game));

console.log(
  'The total score is',
  scores.reduce((a, c) => a + c, 0)
);
