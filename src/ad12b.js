/* --- Day 12: Hill Climbing Algorithm --- */

import { readFile } from './helpers/index.js';

/* CONSTS */
const START = 'S';
const END = 'E';
const moves = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/* UTILS */
const isReachable = (a, b) => {
  if (a === START) a = 'a';
  if (b === END) b = 'z';
  return a.charCodeAt(0) >= b.charCodeAt(0) - 1;
};

const create2DArray = (y, x, filler) =>
  JSON.parse(JSON.stringify(new Array(y).fill(new Array(x).fill(filler))));

/* CLASSES */
class Map {
  constructor(map) {
    this.map = map;
    this.start = this.findItem(START);
    this.end = this.findItem(END);
  }

  findItem(letter) {
    let position = null;
    this.map.forEach((row, y) => {
      if (row.indexOf(letter) < 0) return;
      position = [y, row.indexOf(letter)];
    });
    return position;
  }

  isValidPositionOnMap(y, x) {
    return y >= 0 && y < this.map.length && x >= 0 && x < this.map[0].length;
  }

  findPath() {
    let stepsToA = undefined;
    const queue = [this.end];
    const distanceMap = create2DArray(this.map.length, this.map[0].length, -1);
    distanceMap[this.end[0]][this.end[1]] = 0;

    while (!stepsToA && queue.length) {
      const [y, x] = queue.shift();

      moves.forEach(([xDiff, yDiff]) => {
        const neighbour = [y + yDiff, x + xDiff];

        if (!this.isValidPositionOnMap(...neighbour)) return;
        const isNeighbourUnvisited = distanceMap[neighbour[0]][neighbour[1]] < 0;
        const isNeighbourReachable = isReachable(
          this.map[neighbour[0]][neighbour[1]],
          this.map[y][x]
        );

        if (isNeighbourUnvisited && isNeighbourReachable) {
          distanceMap[neighbour[0]][neighbour[1]] = distanceMap[y][x] + 1;
          queue.push(neighbour);

          if (this.map[neighbour[0]][neighbour[1]] !== 'a') return;
          stepsToA = distanceMap[y][x] + 1;
        }
      });
    }
    return stepsToA;
  }
}

/* MAIN */
const mapInput = readFile('./input/input12.txt', '\n').filter(Boolean);
const map = new Map(mapInput.map(item => item.split('')));
console.log('The shortest path to a is', map.findPath());
