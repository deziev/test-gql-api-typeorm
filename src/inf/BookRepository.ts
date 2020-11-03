import { Repository } from 'typeorm';
import { Book } from 'domain/Book';

export type BookRepository = Repository<Book>;
