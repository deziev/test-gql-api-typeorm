import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Book {
  @PrimaryGeneratedColumn()
  public bookId!: number;

  @Column()
  public name!: string;

  @Column()
  public pageCount!: number;

  @Column()
  public authorId!: number;

  // Без связки через typeorm
  // public author!: Author;
}

export { Book };
