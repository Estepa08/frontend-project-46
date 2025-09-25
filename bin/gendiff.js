#!/usr/bin/env node
import { Command } from 'commander'
import gendiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format (stylish, plain)', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      const result = gendiff(filepath1, filepath2, options.format)
      console.log(result)
    }
    catch (err) {
      console.error('Error:', err.message)
      process.exit(1)
    }
  })

program.parse(process.argv)
