/* --- Day 1: Calorie Counting --- */

import { readFile } from './helpers/index.js';

const elves = readFile('./input/input01.txt', '\n\n').map(item => item.split('\n').map(Number));

const elvesCalories = elves.map(elve => elve.reduce((acc, cur) => acc + cur, 0));
elvesCalories.sort((a, b) => b - a);
const topThree = elvesCalories.slice(0, 3).reduce((acc, cur) => acc + cur, 0);

console.log('The  solution is', topThree);
