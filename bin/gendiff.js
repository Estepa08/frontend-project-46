#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/index.js';
import { diff } from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const { obj1, obj2 } = gendiff(filepath1, filepath2); // достаём объекты
      const result = diff(obj1, obj2); // сравниваем
      console.log(result); // выводим разницу
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1); // важно для CLI, чтобы показать код ошибки
    }
  });

program.parse(process.argv);
