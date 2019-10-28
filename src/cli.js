import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { cfValidate } from './validation';

function parseArgumentsIntoOptions(rawArgs){
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--template': String, // CloudFormation template file path
      '--config': String,

      // Aliases
      '-h': '--help',
      '-t': '--template',
      '-c': '--config'
    }
  );

  return {
    '--help': args['--help'] || false,
    template: args['--template'],
    config: args['--config']
  }
}

async function promptForMissingOptions(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'input',
      name: 'template',
      message: 'Please enter CloudFormation template file path(e.g. ~/Lambda/cfn.yaml):'
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

  if (options['--help']) {
    console.log(`Thank you for trying out ${chalk.italic.yellow('cfn-validate')} package.`);
    console.log(chalk.blueBright('\nUsage:'));
    console.log(chalk.redBright('  ❯❯❯'), 'cfn-validate --template ', chalk.italic('<local-cfn-template-file-path>'));
    console.log(chalk.blueBright('\nExample:'));
    console.log(chalk.redBright('  ❯❯❯'), 'cfn-validate --template /Users/username/lambda_cloudformation.yaml');
    return;
  }

  options = await promptForMissingOptions(options);
  cfValidate(options.template);
}
