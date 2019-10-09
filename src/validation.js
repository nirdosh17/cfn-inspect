import fs from 'fs';
import { yamlParse } from 'yaml-cfn';
import Listr from 'listr';
import chalk from 'chalk';

// validate parameters
// check for naming conventions
// validate resource properties
// validate tags
// validate outputs

async function validateParameters(parameters) {
  // return Promise.reject(new Error("Failed to validate 'Parameters'"));
  return true
}

async function validateResources(resources) {
  // return Promise.reject(new Error("Failed to validate 'Resources'"));
  return true
}

async function validateOutputs(outputs) {
  // return Promise.reject(new Error("Failed to validate 'Outputs'"));
  return true
}

export async function cfValidate(templatePath) {
  try {
    const yamlString = fs.readFileSync(templatePath, 'utf8').toString();
    const parsedYaml = yamlParse(yamlString);
    
    const tasks = new Listr([
      {
        title: 'Validate Parameters',
        task: () => validateParameters(parsedYaml.Parameters),
      },
      {
        title: 'Validate Resources',
        task: () => validateResources(parsedYaml.Resources),
      },
      {
        title: 'Validate Outputs',
        task: () => validateOutputs(parsedYaml.Outputs),
      }
    ]);

    await tasks.run();

  } catch (err) {
    console.error(chalk.red('Validation failed!\n ', err));
    process.exit(1);
  }  
}
