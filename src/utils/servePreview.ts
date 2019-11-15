import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import handler from 'serve-handler';
import path from 'path';

export default (port: number): void => {
  const nodeModulesDir = (process.mainModule as { paths: string[] }).paths[1];

  const server: Server = createServer(
    (response: IncomingMessage, request: ServerResponse): Promise<void> =>
      handler(response, request, {
        public: path.join(nodeModulesDir, '@betty-blocks/preview/build'),
      }),
  );

  server.listen(port, (): void => {
    console.info(`Serving the preview at http://localhost:${port}`);
  });
};