import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { schemaConfig } from 'application/gql';

export const createServer = async () => {
  const gqlSchema = await buildSchema(schemaConfig);
  return new ApolloServer({
    schema: gqlSchema,
    playground: true
  });
}
