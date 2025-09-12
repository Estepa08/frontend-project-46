import { parseJSON } from './parser.js';

export const gendiff = (filepath1, filepath2) => {
  const obj1 = parseJSON(filepath1);
  const obj2 = parseJSON(filepath2);
  return { obj1, obj2 };
};
