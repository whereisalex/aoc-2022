/* --- Day 1: Calorie Counting --- */

import { readFile } from './helpers/index.js';

const responses = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
const outcomes = { lost: 0, draw: 3, won: 6 };

const play = ([playerA, playerB]) => {
  if (!playerA || !playerB) return 0;

  let outcome = 0;

  if (responses[playerA] === responses[playerB]) {
    outcome = outcomes.draw;
  } else {
    outcome =
      (responses[playerA] < responses[playerB] &&
        !(responses[playerB] === 3 && responses[playerA] === 1)) ||
      (responses[playerA] === 3 && responses[playerB] === 1)
        ? outcomes.won
        : outcomes.lost;
  }
  return responses[playerB] + outcome;
};

const rounds = readFile('./input/input02.txt', '\n').map(item => item.split(' '));
const scores = rounds.map(game => play(game));

console.log(
  'The total score is',
  scores.reduce((a, c) => a + c, 0)
);
