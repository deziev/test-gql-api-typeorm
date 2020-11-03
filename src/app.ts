import './bootstrap';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';

import { initContainer } from 'components/di';
import { schemaConfig } from 'application/gql';
import { ServerConfig } from '@config';


initContainer().then(async() => {
  const { host, port } = ServerConfig;
  const gqlSchema = await buildSchema(schemaConfig);

  const server = new ApolloServer({
    schema: gqlSchema,
    playground: true
  })

  const { url } = await server.listen({ host, port });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
});