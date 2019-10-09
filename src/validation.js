import fs from 'fs';
import { yamlParse } from 'yaml-cfn';

export function cfValidate(templatePath) {
  try {
    const yamlString = fs.readFileSync(templatePath, 'utf8').toString();
    const parsedYaml = yamlParse(yamlString);
    console.log(parsedYaml);
  } catch (e) {
    console.log('Could not read CloudFormation template!\n' +  e);
  }  
}
