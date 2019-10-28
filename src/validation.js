import fs from 'fs';
import { yamlParse } from 'yaml-cfn';
import Listr from 'listr';
import chalk from 'chalk';
import rc from 'rc';

const packageName = require('../package.json').name;
const config = rc(packageName);

// validate parameters
// check for naming conventions
// validate resource properties
// check if requied tags are present
// validate outputs

function tagKeys(tagsArray){
  let tagKeys = [];
  tagsArray.forEach(tag => {
    tagKeys.push(tag.Key);
  });
  return tagKeys;
}

function missingTags(presentTags) {
  // even 'tag' key might be missing
  if (config.tags) {
    const requiredTags = config.tags.required || [];
    const missing = requiredTags.slice();

    presentTags.forEach(tag => {
      let delIndex = missing.indexOf(tag)
      if (delIndex !== -1) {
        missing.splice(delIndex, 1);
      }
    });

    return missing;
  } else {
    console.log('[WARN] No rules found for tags!');
    return [];
  }
}

async function validateParameters(parameters) {
  // return Promise.reject(new Error("Failed to validate 'Parameters'"));
  return true
}

async function validateResources(resources) {
  // TODO: use Listr here
  for(var resourceId in resources) {
    const resource = resources[resourceId];
    const properties = resource.Properties;
    const tags = properties.Tags;
    const presentTags = tagKeys(tags);
    const mTags = missingTags(presentTags);
    if (mTags.length > 0) {
      return Promise.reject(new Error(`Missing required tags '${mTags.join(', ')}' in the resource '${resourceId}'`));
    }
  }

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
      // {
      //   title: 'Validate Parameters',
      //   task: () => validateParameters(parsedYaml.Parameters),
      // },
      {
        title: 'Validate Tags',
        task: () => validateResources(parsedYaml.Resources),
      },
      // {
      //   title: 'Validate Outputs',
      //   task: () => validateOutputs(parsedYaml.Outputs),
      // }
    ]);

    await tasks.run();

  } catch (err) {
    console.error(chalk.red('Validation failed!\n ', err));
    process.exit(1);
  }
}
