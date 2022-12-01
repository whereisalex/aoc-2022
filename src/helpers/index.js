import fs from 'fs';

export const readFile = (fileName, delimiter) => fs.readFileSync(fileName, 'utf8').split(delimiter);
