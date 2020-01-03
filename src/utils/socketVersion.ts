import fetch from 'node-fetch';
import chalk from 'chalk';

// eslint-disable-next-line
const { socketVersion } = require('../../package.json');

const checkVersion = async () => {
  await fetch(
    'https://raw.githubusercontent.com/justinvdv/cli/master/package.json',
  )
    .then(res => res.json())
    .then(data => {
      if (socketVersion < data.socketVersion)
        console.log(
          chalk.bgMagenta(
            'There is a new Socket version available. Run npm run update-socket',
          ),
        );
    });
};

export default checkVersion;
