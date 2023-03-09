# Zecwallet CLI Helper Library

This library provides a simple way to interact with the ZecWallet command-line interface from your Node.js applications.

## Installation

To install, run:

`npm install zecwallet-cli-helper`

## Usage

To use the library, first require it in your code:

`const { ZecWalletCLI } = require('zecwallet-cli');`

Then, create an instance

`const cliPath = '/path/to/zecwallet-cli';`
`const zecWalletCLI = new ZecWalletCLI(cliPath);`
