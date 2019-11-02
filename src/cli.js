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
      message: 'Please enter CFN template file path(e.g. /Users/john/project/cfn.yaml):'
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

  if (options['--help'] || (!options.template && !options.config)) {
    console.log(`Thank you for trying out ${chalk.italic.yellow('cfn-inspect')} package!`);
    console.log(chalk.blue('\nUsage:'));
    console.log(chalk.redBright('  ❯❯❯'), 'cfn-inspect --template ', chalk.italic('<local-cfn-template-file-path>'));
    console.log(chalk.blue('\nExample 1 (config set in ~/.cfn-inspectrc file):'));
    console.log(chalk.redBright('  ❯❯❯'), 'cfn-inspect --template ~/lambda/iac.yaml');
    console.log(chalk.blue('\nExample 2 (config passed as parameter):'));
    console.log(chalk.redBright('  ❯❯❯'), 'cfn-inspect --template ~/lambda/iac.yaml --config ~/validation_config.yaml');
    return;
  }

  options = await promptForMissingOptions(options);
  cfValidate(options.template);
}
