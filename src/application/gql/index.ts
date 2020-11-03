import { BuildSchemaOptions } from 'type-graphql';
import { AuthorResolver } from './AuthorResolver';

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [AuthorResolver]
}