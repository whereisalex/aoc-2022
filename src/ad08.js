/* --- Day 8: Treetop Tree House --- */

import { readFile } from './helpers/index.js';

class Forest {
  constructor(forest) {
    this.forest = forest;
    this.fromTop = JSON.parse(JSON.stringify(forest));
    this.fromBottom = JSON.parse(JSON.stringify(forest));
    this.fromLeft = this.generateLeftView(JSON.parse(JSON.stringify(forest)));
    this.fromRight = this.generateRightView(JSON.parse(JSON.stringify(forest)));
    this.generateTopView(this.fromTop);
    this.generateBottomView(this.fromBottom);
  }

  generateLeftView(forest) {
    return forest.map(row =>
      row.reduce((acc, cur) => [...acc, Math.max(acc.length ? acc[acc.length - 1] : 0, cur)], [])
    );
  }
  generateRightView(forest) {
    return forest.map(row => {
      const reversed = row.reverse();
      const result = row.reduce(
        (acc, cur) => [...acc, Math.max(acc.length ? acc[acc.length - 1] : 0, cur)],
        []
      );
      return result.reverse();
    });
  }

  generateTopView(output) {
    this.forest.forEach((row, x) =>
      row.forEach((_, y) => {
        output[x][y] = Math.max(Number(output[Math.max(x - 1, 0)][y]), Number(output[x][y]));
      })
    );
  }

  generateBottomView(output) {
    output.reverse();
    this.generateTopView(output);
    output.reverse();
  }

  generateTreeVisibility() {
    return this.forest.map((row, x) =>
      row.map((col, y) => {
        if (x === 0 || x === this.forest.length - 1 || y === 0 || y === row.length - 1) {
          return true;
        }
        return [
          this.fromTop[x - 1][y],
          this.fromBottom[x + 1][y],
          this.fromLeft[x][y - 1],
          this.fromRight[x][y + 1],
        ].some(i => i < this.forest[x][y]);
      })
    );
  }

  getVisibleTreeCount() {
    const treeVisibility = forest.generateTreeVisibility();
    return treeVisibility.reduce((acc, cur) => acc + cur.reduce((a, b) => a + b, 0), 0);
  }

  getTreeScenicScores() {
    return this.forest.map((row, x) =>
      row.map((_, y) => {
        return (
          this.getTopScore(x, y) *
          this.getLeftScore(x, y) *
          this.getRightScore(x, y) *
          this.getBottomScore(x, y)
        );
      })
    );
  }

  getTopScore(x, y) {
    let count = 0;
    const targetTree = this.forest[x][y];
    while (x > 0) {
      count = count + 1;
      x = x - 1;
      if (this.forest[x][y] >= targetTree) {
        return count;
      }
    }
    return count;
  }

  getBottomScore(x, y) {
    let count = 0;
    const targetTree = this.forest[x][y];
    while (x < this.forest.length - 1) {
      count = count + 1;
      x = x + 1;
      if (this.forest[x][y] >= targetTree) {
        return count;
      }
    }
    return count;
  }
  getRightScore(x, y) {
    let count = 0;
    const targetTree = this.forest[x][y];
    while (y < this.forest.length - 1) {
      count = count + 1;
      y = y + 1;
      if (this.forest[x][y] >= targetTree) {
        return count;
      }
    }
    return count;
  }
  getLeftScore(x, y) {
    let count = 0;
    const targetTree = this.forest[x][y];
    while (y > 0) {
      count = count + 1;
      y = y - 1;
      if (this.forest[x][y] >= targetTree) {
        return count;
      }
    }
    return count;
  }

  getMaxScenicScore() {
    const treeScores = forest.getTreeScenicScores();
    return treeScores.reduce(
      (maxScore, cur) =>
        Math.max(
          maxScore,
          cur.reduce((a, b) => Math.max(a, b), 0)
        ),
      0
    );
  }
}

const trees = readFile('./input/input08.txt', '\n').filter(Boolean);
const forest = new Forest(trees.map(i => i.split('').map(Number)));

console.log(forest.getVisibleTreeCount());
console.log(forest.getMaxScenicScore());
