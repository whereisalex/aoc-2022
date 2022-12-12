/* --- Day 9: Rope Bridge --- */

import { readFile } from './helpers/index.js';

const moves = { R: [0, 1], L: [0, -1], U: [1, 0], D: [-1, 0] };

class Rope {
  constructor(movements) {
    this.head = [0, 0];
    this.tail = [0, 0];
    this.tailPositions = new Set(['0,0']);
    this.moveRope(movements);
  }

  moveRope(movements) {
    movements.forEach(([direction, amount]) => {
      for (let i = parseInt(amount); i > 0; i--) {
        this.moveHead(direction);
        this.moveTail();
      }
    });
  }

  moveHead(direction) {
    this.head[0] = this.head[0] + moves[direction][0];
    this.head[1] = this.head[1] + moves[direction][1];
  }

  moveTail() {
    if (!this.areHeadAndTailTouching()) {
      this.tail = this.tail.map((val, i) => val - Math.max(Math.min(val - this.head[i], 1), -1));
      this.tailPositions.add(this.tail.join(','));
    }
  }

  areHeadAndTailTouching() {
    return Math.abs(this.head[0] - this.tail[0]) < 2 && Math.abs(this.head[1] - this.tail[1]) < 2;
  }
}

const movements = readFile('./input/input09.txt', '\n')
  .filter(Boolean)
  .map(item => item.split(' '));
const rope = new Rope(movements);

console.log('The tail visited', rope.tailPositions.size, 'positions');
