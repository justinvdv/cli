# Betty Blocks Component CLI with Live Reload

## Introduction

This fork is a copy of https://github.com/bettyblocks/cli <br />
This fork includes the functionalty for Live reload.

## Installation

To install the CLI you will need [a recent version of Node.js](https://nodejs.org/en/).

```bash
$ git clone https://github.com/justinvdv/cli.git
$ cd cli
$ npm install
$ npm run build
$ npm link
```

## Create a new Component Set

```bash
$ bb components create my-project
$ cd my-project
$ npm link ../cli-dir
$ npm install
```

## Start the development server

```bash
$ npm run dev
```

## Documentation

Documentation can be found at the original repository https://github.com/bettyblocks/cli
