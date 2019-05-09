# accessmap-webapp

## Installation

Do the docker-compose in the Orchestration directory, then:

run `npm install` in the accessmap-webapp directory
run `npm run build` in the same directory
run `npm start` in the same directory
in the case of package dependencies, use `npm audit fix` to install the packages needed

if you get the error with 'webpack-cli required', do
`npm i -g webpack-cli` or `yarn add webpack-cli -D`

## Configuration

Set the environment variables found in `set_envs.sample`.

#### Important: if running the development server, prefix all `SERVER`

variables with http://. The proxy won't work otherwise and all the servers will
break

## Sponsors / Supporters of Open Source

Continued development of AccessMap is sponsored by the Taskar Center for Accessible
Technology.

Hosting of AccessMap is sponsored by Microsoft Azure.

Cross-browser testing is supported by
[![BrowserStack](assets/logos/browserstack.png)](https://www.browserstack.com) (BrowserStack).
