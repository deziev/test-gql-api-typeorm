import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class Author {
  @Field(_type => ID)
  @PrimaryGeneratedColumn()
  public authorId!: number;

  @Field()
  @Column()
  public name!: string;
}

export { Author };
