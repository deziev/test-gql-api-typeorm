import Container from 'typedi';
import { Arg, Query, Resolver } from 'type-graphql';
import { Type } from 'components/container/Type';

import { AuthorRepository } from 'inf/AuthorRepository';

import { Author } from 'domain/Author';

@Resolver(Author)
class AuthorResolver {
  private authorRespository: AuthorRepository;

  constructor() {
    this.authorRespository = Container.get<AuthorRepository>(Type.AuthorRepository);
  }

  @Query(_returns => Author)
  public author(@Arg("authorId") id: number) {
    const author = this.authorRespository.findOne(id);
    if (!author) {
      throw new Error(`Author with ${id} not found!`);
    }
    return author;
  }

}

export { AuthorResolver };
