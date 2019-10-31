# cfn-inspect
A simple nodejs based CLI to validate AWS CloudFormation templates.

The idea behind this tool is to check CloudFormation templates to ensure that it contains all the required attributes and comply with your organization's standards and policies for Infrastructure As Code(IAC).

## Features
- Enforce the presense of specific tags in the Resources

## Installation
```bash
npm install cfn-inspect
```

## Configuration
We can pass configuration in one of the following ways:
- 1. Setup `.cfn-inspectrc` file in home directory.
- 2. Pass config JSON file path using `--config ~/config.json`

Sample config:
```json
{
  "tags": {
    "required": ["ProjectName", "EnvironmentName"]
  }
}
```

## Usage
**Usage:**
```
  ❯❯❯ cfn-inspect --template <local-cfn-template-file-path>
```

**Example:**
```
  ❯❯❯ cfn-inspect --template ~/lambda-cfn.yaml
  ❯❯❯ cfn-inspect --template ~/test.yaml --config ~/config.json
```

**Seek Help:**
```
  ❯❯❯ cfn-inspect --help
```
