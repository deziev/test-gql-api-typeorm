import { Field, InputType } from 'type-graphql';

@InputType()
class AddBookInput {
  @Field()
  public name!: string;

  @Field()
  public pageCount!: number;

  @Field()
  public authorId!: number;
}

export { AddBookInput };