import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBookTable1604420382761 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table book (
        "bookId" serial primary key,
        "authorId" integer references author ("authorId") on delete cascade,
        name varchar not null,
        "pageCount" integer not null
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table book
    `);
  }

}
