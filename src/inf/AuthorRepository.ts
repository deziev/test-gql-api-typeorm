import { Repository } from 'typeorm';
import { Author } from 'domain/Author';

export type AuthorRepository = Repository<Author>;
