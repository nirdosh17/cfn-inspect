# cfn-inspect
The motive behind this nodejs based CLI tool is to check CloudFormation templates to ensure that it contains all the required attributes and comply with your organization's standards and policies for IAC.

## Features
- Enforce the presense of specific tags in the Resources

## Installation
```bash
npm install cfn-inspect
```

## Configuration
To validate the template, we need to define the rules first. The rules are defined in JSON which looks like below:
```json
{
  "tags": {
    "required": ["ProjectName", "EnvironmentName"]
  }
}
```

Finally we need to use the config while running the command. There are two ways to do that:
- Create a file with name `.cfn-inspectrc` in home directory and add JSON config there. The command will pick up config from the rc file by default if no config argument is passed.

  -- OR --

- Create a config file wherever you like and pass the file path like this `--config ~/config.json`. Priority is given to `--config` argument over `.cfn-inspectrc` file.

## Usage
**Usage:**
```
  ❯❯❯ cfn-inspect --template <cfn-template-file-path>
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
