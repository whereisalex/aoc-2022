/* --- Day 5: Supply Stacks --- */

import { readFile } from './helpers/index.js';

class CrateMover {
  constructor(instructions) {
    this.stacks = [
      ['Z', 'J', 'N', 'W', 'P', 'S'],
      ['G', 'S', 'T'],
      ['V', 'Q', 'R', 'L', 'H'],
      ['V', 'S', 'T', 'D'],
      ['Q', 'Z', 'T', 'D', 'B', 'M', 'J'],
      ['M', 'W', 'T', 'J', 'D', 'C', 'Z', 'L'],
      ['L', 'P', 'M', 'W', 'G', 'T', 'J'],
      ['N', 'G', 'M', 'T', 'B', 'F', 'Q', 'H'],
      ['R', 'D', 'G', 'C', 'P', 'B', 'Q', 'W'],
    ];
    this.instructions = this.parseInstructions(instructions);
  }

  parseInstructions(input) {
    let lines = input.split('\n').map(item => item.split(' '));
    return lines.map(item => [item[1], item[3], item[5]].map(i => Number(i)));
  }

  moveCratesOneByOne() {
    this.instructions.forEach(([count, from, to]) => {
      if (!count) return;
      while (count > 0 && this.stacks[from - 1].length > 0) {
        let temp = this.stacks[from - 1].pop();
        this.stacks[to - 1].push(temp);
        count = count - 1;
      }
    });
  }

  moveCrates() {
    this.instructions.forEach(([count, from, to]) => {
      if (!count) return;
      let temp = this.stacks[from - 1].splice(this.stacks[from - 1].length - count);
      this.stacks[to - 1].push(...temp);
    });
  }

  getTopCrates() {
    return this.stacks
      .map(stack => (stack.length ? stack[stack.length - 1] : ''))
      .reduce((a, c) => a + c, '');
  }
}

const crateMover9000 = new CrateMover(readFile('./input/input05.txt', '\n\n')[1]);
crateMover9000.moveCratesOneByOne();

const crateMover9001 = new CrateMover(readFile('./input/input05.txt', '\n\n')[1]);
crateMover9001.moveCrates();

console.log(crateMover9000.getTopCrates(), 'are the top crates.');
console.log(crateMover9001.getTopCrates(), 'are the top crates.');
