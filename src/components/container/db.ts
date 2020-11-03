import { Container } from 'typedi';
import { getRepository } from 'typeorm';
import { Type } from './Type';

import { DbConfig } from '@config';
import { DbConnectionFactory } from 'components/db/DbConnectionFactory';

import { Author } from 'domain/Author';
import { Book } from 'domain/Book';

export const initDbContainer = async () => {

  await DbConnectionFactory.create(DbConfig);

  Container.set(Type.AuthorRepository, getRepository(Author));
  Container.set(Type.BookRepository, getRepository(Book));
}