import '../../bootstrap';
import Container from 'typedi';
import { resolve } from 'path';

import { initContainer  } from 'components/di';
import { Type } from 'components/container/Type';

import { AuthorRepository } from 'inf/AuthorRepository';
import { BookRepository } from 'inf/BookRepository';

import { saveAuthorData } from './saveAuthorData';

initContainer().then(async() => {
  const fixturePath = resolve(__dirname, '../../../fixtures/authors');

  const bookRepository = Container.get<BookRepository>(Type.BookRepository);
  const authorRepository = Container.get<AuthorRepository>(Type.AuthorRepository);

  const data = require(fixturePath);
  await Promise.all(data.map((it: any) => saveAuthorData(it, authorRepository, bookRepository)));
})

