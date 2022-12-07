/* --- Day 7: No Space Left On Device --- */

import { readFile } from './helpers/index.js';

const TOTAL_SPACE = 70000000;
const REQUIRED_SPACE = 30000000;

class Node {
  constructor(name, parent = null, size = 0) {
    this.size = size;
    this.children = {};
    this.parent = parent;
    this.name = name;
  }

  addChild(name, childSize) {
    this.children[name] = new Node(name, this, childSize);
  }
}

class FileSystem {
  constructor(instructions, totalSpace = 0, requiredSpace = 0) {
    this.root = new Node('/');
    this.pointer = this.root;
    this.folderSizes = [];
    this.generateTree(instructions);
    this.totalSpace = totalSpace;
    this.neededSpace = requiredSpace - (totalSpace - this.getFolderSizes(this.root));
  }

  generateTree(instructions) {
    instructions.forEach(instruction => {
      if (instruction.startsWith('cd')) {
        this.changeDirectory(instruction.split(' ')[1].trim());
      } else if (instruction.startsWith('ls')) {
        this.list(instruction.split('\n').map(item => item.trim()));
      } else {
        console.error(`Invalid instruction '${instruction}'`);
      }
    });
  }

  changeDirectory(directory) {
    if (directory === '/') {
      this.pointer = this.root;
    } else if (directory === '..') {
      this.pointer = this.pointer.parent;
    } else {
      if (directory in this.pointer.children) {
        this.pointer = this.pointer.children[directory];
      } else {
        console.error(`Directory '${directory}' is no directory of '${this.pointer.name}'`);
      }
    }
  }

  list(items) {
    items.forEach(item => {
      const [info, name] = item.split(' ');
      this.pointer.addChild(name, info === 'dir' ? 0 : parseInt(info));
    });
  }

  getFolderSizes(node) {
    if (node.size) return node.size;
    const folderSize = Object.values(node.children)
      .map(child => this.getFolderSizes(child))
      .reduce((a, b) => a + b, 0);
    this.folderSizes.push(folderSize);
    return folderSize;
  }

  getSumOfFolderSmallerThanMaxSize(maxSize) {
    return this.folderSizes.filter(item => item <= maxSize).reduce((a, b) => a + b, 0);
  }

  getSmallestFolderLargerThanNeededSpace() {
    return this.folderSizes.reduce(
      (acc, cur) => (cur > this.neededSpace && cur < acc ? cur : acc),
      this.totalSpace
    );
  }
}

const instructions = readFile('./input/input07.txt', '$ ').filter(Boolean);
const tree = new FileSystem(instructions, TOTAL_SPACE, REQUIRED_SPACE);

console.log('The sum of folders is', tree.getSumOfFolderSmallerThanMaxSize(100000));
console.log('The folder has the space', tree.getSmallestFolderLargerThanNeededSpace());
