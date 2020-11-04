import './bootstrap';

import { initContainer } from 'components/di';
import { ServerConfig } from '@config';
import { createServer } from 'createServer';


initContainer().then(async() => {
  const { host, port } = ServerConfig;
  const server = await createServer();

  const { url } = await server.listen({ host, port });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
});