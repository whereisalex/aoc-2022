/* --- Day 9: Rope Bridge --- */

import { readFile } from './helpers/index.js';

const moves = { R: [0, 1], L: [0, -1], U: [1, 0], D: [-1, 0] };

class Rope {
  constructor(movements, length = 2) {
    this.movements = movements;
    this.rope = Array.from({ length }, () => [0, 0]);
    this.tailPositions = new Set(['0,0']);
    this.moveRope(movements);
  }

  moveRope(movements) {
    movements.forEach(([direction, amount]) => {
      for (let i = parseInt(amount); i > 0; i--) {
        this.moveHead(direction);
      }
    });
  }

  moveHead(direction) {
    this.rope[0] = this.rope[0].map((val, i) => val + moves[direction][i]);
    this.moveTail();
  }

  moveTail(knot = 1) {
    const lastKnot = this.rope.length - 1;
    if (knot > lastKnot) return;
    if (!this.areKnotsTouching(knot - 1, knot)) {
      this.rope[knot] = this.rope[knot].map(
        (val, i) => val - Math.max(Math.min(val - this.rope[knot - 1][i], 1), -1)
      );
    }
    if (knot === lastKnot) {
      this.tailPositions.add(this.rope[knot].join(','));
    }
    this.moveTail(knot + 1);
  }

  areKnotsTouching(knotA, knotB) {
    return (
      Math.abs(this.rope[knotA][0] - this.rope[knotB][0]) < 2 &&
      Math.abs(this.rope[knotA][1] - this.rope[knotB][1]) < 2
    );
  }
}

const movements = readFile('./input/input09.txt', '\n')
  .filter(Boolean)
  .map(item => item.split(' '));

const ropeA = new Rope(movements);
console.log('The tail visited', ropeA.tailPositions.size, 'positions');

const ropeB = new Rope(movements, 10);
console.log('The tail visited', ropeB.tailPositions.size, 'positions');
