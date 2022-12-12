/* --- Day 10: Cathode-Ray Tube --- */

import { readFile } from './helpers/index.js';

class CathodeRayTube {
  constructor(program, cycles) {
    this.x = 1;
    this.cycles = cycles;
    this.register = [];
    this.screen = [];
    this.runProgram(program);
  }

  runProgram(instructions) {
    instructions.forEach(([instruction, count]) => {
      this.pushToRegister();
      this.pushToScreen();
      if (instruction === 'addx') {
        this.pushToRegister();
        this.pushToScreen();
        this.x = this.x + parseInt(count);
      }
    });
  }

  pushToRegister() {
    this.register.push(this.x);
  }

  pushToScreen() {
    this.screen.push(Math.abs(((this.screen.length + 1) % 40) - 1 - this.x) < 2 ? '#' : '.');
  }

  getCylcStrengths() {
    return this.register
      .filter((_, i) => this.cycles.includes(i + 1))
      .map((val, index) => val * this.cycles[index])
      .reduce((a, b) => a + b, 0);
  }

  printImage() {
    return this.screen.reduce((prev, cur, i) => prev + cur + ((i + 1) % 40 === 0 ? '\n' : ''), '');
  }
}

const program = readFile('./input/input10.txt', '\n')
  .filter(Boolean)
  .map(item => item.split(' '));
const screen = new CathodeRayTube(program, [20, 60, 100, 140, 180, 220]);

console.log('The sum of the signal strengths is', screen.getCylcStrengths());
console.log('This is the screen:');
console.log(screen.printImage());
