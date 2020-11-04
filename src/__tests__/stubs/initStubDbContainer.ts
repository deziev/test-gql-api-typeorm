import Container from 'typedi';
import { Type } from 'components/container/Type';
import { StubRepository } from '../utils/StubRepository';

export const initStubDbContainer = async() => {
  Container.set(Type.AuthorRepository, new StubRepository('authorId'));
  Container.set(Type.BookRepository, new StubRepository('bookId'));
}