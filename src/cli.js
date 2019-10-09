import arg from 'arg';
import inquirer from 'inquirer';

import { cfValidate } from './validation';

function parseArgumentsIntoOptions(rawArgs){
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--template': String, // CloudFormation template file path

      // Aliases
      '-h': '--help',
      '-t': '--template'
    }
  );

  return {
    '--help': args['--help'] || false,
    template: args['--template']
  }
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'input',
      name: 'template',
      message: 'Please enter CloudFormation template file path:'
    })
  }

  // https://www.npmjs.com/package/inquirer#questions
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template
  }
}

export async function validate(args) {
  // args contains array of arguments passed from CLI
  // https://docs.npmjs.com/files/package.json#bin
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options);
  cfValidate(options.template);
}
