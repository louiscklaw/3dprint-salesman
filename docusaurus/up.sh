#!/usr/bin/env bash

set -ex

# npm i @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest

npm run build
npm run serve
