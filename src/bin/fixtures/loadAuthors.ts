import '../../bootstrap';
import Container from 'typedi';
import { resolve } from 'path';
import { plainToClass } from 'class-transformer';

import { initContainer  } from 'components/di';
import { Type } from 'components/container/Type';

import { AuthorRepository } from 'inf/AuthorRepository';
import { BookRepository } from 'inf/BookRepository';

import { Author } from 'domain/Author';
import { Book } from 'domain/Book';

const saveAuthorData = async (
  data: { name: string; books: {name: string; pageCount: number;}[]; },
  authorRepository: AuthorRepository,
  bookRepository: BookRepository
) => {
  const author = plainToClass(Author, data);
  await authorRepository.save(author);
  await Promise.all(
    data.books
      .map(book => bookRepository.save(
        plainToClass(Book, { ...book, authorId: author.authorId }))
      )
  );
}

initContainer().then(async() => {
  const fixturePath = resolve(__dirname, '../../../fixtures/authors');

  const bookRepository = Container.get<BookRepository>(Type.BookRepository);
  const authorRepository = Container.get<AuthorRepository>(Type.AuthorRepository);

  const data = require(fixturePath);
  await Promise.all(data.map((it: any) => saveAuthorData(it, authorRepository, bookRepository)));
})

