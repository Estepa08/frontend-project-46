#!/usr/bin/env node
import { Command } from 'commander';
import { gendiff } from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const result = gendiff(filepath1, filepath2);
      console.log('File 1:', result.obj1);
      console.log('File 2:', result.obj2);
    } catch (err) {
      console.error('Error:', err.message);
    }
  });

program.parse(process.argv);
