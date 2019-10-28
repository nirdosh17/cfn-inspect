# cfn-validator
A simple nodejs based CLI to validate AWS CloudFormation templates.

The idea behind this tool is to check CloudFormation templates to ensure that it contains all the required attributes and meets comply to your organization's standards and policies for Infrastructure As Code(IAC).

## Features
- Enforce the presense of specific tags in the Resources

## Installation
The command will be available:
```bash
npm install cfn-validate
```

## Configuration
In order to validate the template, first you have to setup the validation rules in `~/.cfn-validaterc` file in the home directory.

It looks something like this:
```json
{
  "tags": {
    "required": ["ProjectName", "EnvironmentName"]
  }
}
```

## Usage
Usage:
```
  ❯❯❯ cfn-validate --template  <local-cfn-template-file-path>
```

Example:
```
  ❯❯❯ cfn-validate --template ~/lambda-cfn.yaml
  ❯❯❯ cfn-validate --template ~/test.yaml --config ~/config.json
```

Seek Help:
```
  ❯❯❯ cfn-validate --help
```
