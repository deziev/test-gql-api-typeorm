import Container from 'typedi';
import { plainToClass } from 'class-transformer';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Type } from 'components/container/Type';

import { AddAuthorInput } from './inputs/AddAuthorInput';

import { AuthorRepository } from 'inf/AuthorRepository';

import { Author } from 'domain/Author';

@Resolver(Author)
class AuthorResolver {
  private authorRespository: AuthorRepository;

  constructor() {
    this.authorRespository = Container.get<AuthorRepository>(Type.AuthorRepository);
  }

  @Query(_returns => Author)
  public async author(@Arg("id") id: number) {
    return await this.authorRespository.findOneOrFail(id);
  }

  @Query(_returns => [Author])
  public async authors() {
    return await this.authorRespository.find();
  }

  @Mutation(_returns => Author)
  public async addAuthor(@Arg('newAuthorData') newAuthorData: AddAuthorInput) {
    const author = plainToClass(Author, newAuthorData);
    const sameNameAuthor = await this.authorRespository.findOne({ name: author.name });
    if (sameNameAuthor) {
      throw new Error(`Author with name: ${author.name} already exists!`);
    }
    return await this.authorRespository.save(author);
  }

  @Mutation(_returns => Boolean)
  public async deleteAuthor(@Arg('id') id: number) {
    try {
      const author = await this.authorRespository.findOneOrFail(id);
      await this.authorRespository.remove(author)
      return true
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export { AuthorResolver };
