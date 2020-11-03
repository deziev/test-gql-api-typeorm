import { plainToClass } from 'class-transformer';

import { AuthorRepository } from 'inf/AuthorRepository';
import { BookRepository } from 'inf/BookRepository';

import { Author } from 'domain/Author';
import { Book } from 'domain/Book';

export const saveAuthorData = async (
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