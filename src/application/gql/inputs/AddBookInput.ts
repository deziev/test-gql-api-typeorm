import { Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class AddBookInput {
  @Field()
  public name!: string;

  @Field()
  @Min(1)
  public pageCount!: number;

  @Field()
  public authorId!: number;
}

export { AddBookInput };