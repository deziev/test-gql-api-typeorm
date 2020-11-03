import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class AddAuthorInput {
  @Field()
  @Length(2, 255)
  public name!: string;
}

export { AddAuthorInput };
