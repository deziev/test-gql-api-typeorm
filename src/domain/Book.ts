import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Author } from './Author';

@ObjectType()
@Entity()
class Book {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  public bookId!: number;

  @Field()
  @Column()
  public name!: string;

  @Field()
  @Column()
  public pageCount!: number;

  @Field()
  @Column()
  public authorId!: number;

  // Без связки через typeorm
  @Field(_type => Author)
  public author!: Author;
}

export { Book };
