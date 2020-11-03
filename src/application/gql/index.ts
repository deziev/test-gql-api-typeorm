import { BuildSchemaOptions } from 'type-graphql';
import { AuthorResolver } from './AuthorResolver';
import { BookResolver } from './BookResolver';

export const schemaConfig: BuildSchemaOptions = {
  resolvers: [AuthorResolver, BookResolver]
}