import Container from 'typedi';
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Type } from 'components/container/Type';

import { AddBookInput } from './inputs/AddBookInput';

import { AuthorRepository } from 'inf/AuthorRepository';
import { BookRepository } from 'inf/BookRepository';

import { Book } from 'domain/Book';
import { plainToClass } from 'class-transformer';

@Resolver(Book)
class BookResolver {
  private authorRespository: AuthorRepository;
  private bookRepository: BookRepository;

  constructor() {
    this.authorRespository = Container.get<AuthorRepository>(Type.AuthorRepository);
    this.bookRepository = Container.get<BookRepository>(Type.BookRepository);
  }

  @Query(_returns => Book)
  public async book(@Arg("id") id: number) {
    return await this.bookRepository.findOneOrFail(id);
  }

  @Query(_returns => [Book])
  public async books() {
    return await this.bookRepository.find();
  }

  @Mutation(_returns => Book)
  public async addBook(@Arg('newBookData') newBookData: AddBookInput) {
    await this.authorRespository.findOneOrFail(newBookData.authorId);
    const book = plainToClass(Book, newBookData);
    return await this.bookRepository.save(book);
  }

  @Mutation(_returns => Book)
  public async deleteBook(@Arg('id') id: number) {
    const book = await this.bookRepository.findOneOrFail(id);
    await this.bookRepository.remove(book);
    return book;
  }

  @FieldResolver()
  public async author(@Root() book: Book) {
    return await this.authorRespository.findOneOrFail(book.authorId);
  }

}

export { BookResolver };
