import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Author {
  @PrimaryGeneratedColumn()
  public authorId!: number;

  @Column()
  public name!: string;
}

export { Author };
