import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import { existsSync } from 'fs';
import chalk from 'chalk';
import handler from 'serve-handler';
import Socket from './socket';

import { checkUpdateAvailableCLI } from './checkUpdateAvailable';
import socketVersion from './socketVersion';

const socket = new Socket();

const serveComponentSet = (rootDir: string, port: number): void => {
  const server: Server = createServer(
    (response: IncomingMessage, request: ServerResponse): Promise<void> =>
      handler(response, request, {
        public: `${rootDir}/dist`,
        headers: [
          {
            source: '**/*.@(json)',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Cache-Control',
                value: 'no-cache ',
              },
            ],
          },
        ],
      }),
  );

  server.listen(port, (): void => {
    console.info(
      chalk.green(`Serving the component set at http://localhost:${port}`),
    );
  });
};

export default async (rootDir: string, port: number): Promise<void> => {
  await checkUpdateAvailableCLI();
  socketVersion();
  if (existsSync(`${rootDir}/dist`)) {
    serveComponentSet(rootDir, port);
    socket.getApp();
  } else {
    console.error(
      chalk.red(
        '\nAn error has occurred, please check if something went wrong during the build step.\n',
      ),
    );
  }
};
