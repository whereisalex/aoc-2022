/* --- Day 11: Monkey in the Middle --- */

import { readFile } from './helpers/index.js';

const math = { '*': (a, b) => a * b, '+': (a, b) => a + b };
const getOperand = (operand, old) => (operand === 'old' ? old : parseInt(operand));

class Monkey {
  constructor({ items, operation, divisor, trueIndex, falseIndex }) {
    this.items = items.map(Number);
    this.inspectedItems = 0;
    this.getReceivingMonkey = n => (n % divisor === 0 ? trueIndex : falseIndex);
    this.getValueAfterInspection = n => {
      this.inspectedItems += 1;
      return math[operation[1]](getOperand(operation[0], n), getOperand(operation[2], n));
    };
  }
  addItem(itemValue) {
    this.items.push(itemValue);
  }
  getFirstItem() {
    return this.items.shift();
  }
}

class MonkeyGang {
  constructor(monkeyInformation) {
    this.monkeys = [];
    this.generateMonkeys(monkeyInformation);
  }

  generateMonkeys(monkeyInformation) {
    monkeyInformation.forEach(([_, startInfo, operationInfo, testInfo, trueCase, falseCase]) => {
      const items = startInfo.split(': ')[1].split(', ');
      const divisor = parseInt(testInfo.split(' ').pop());
      const trueIndex = parseInt(trueCase.split(' ').pop());
      const falseIndex = parseInt(falseCase.split(' ').pop());
      const operation = operationInfo.split(' = ')[1].split(' ');
      this.monkeys.push(new Monkey({ items, divisor, operation, trueIndex, falseIndex }));
    });
  }

  throwItemsWithRelieve(roundCount) {
    for (let i = roundCount; i > 0; i--) {
      this.monkeys.forEach(monkey => {
        while (monkey.items.length > 0) {
          const itemValue = Math.floor(monkey.getValueAfterInspection(monkey.getFirstItem()) / 3);
          this.monkeys[monkey.getReceivingMonkey(itemValue)].addItem(itemValue);
        }
      });
    }
  }

  getLevelOfMonkeyBusiness() {
    let sortedMonkeys = this.monkeys.map(monkey => monkey.inspectedItems).sort((a, b) => b - a);
    return sortedMonkeys[0] * sortedMonkeys[1];
  }
}

const monkeyList = readFile('./input/input11.txt', '\n\n').filter(Boolean);
const monkeys = new MonkeyGang(monkeyList.map(item => item.split('\n')));
monkeys.throwItemsWithRelieve(20);
console.log('The product is', monkeys.getLevelOfMonkeyBusiness());
