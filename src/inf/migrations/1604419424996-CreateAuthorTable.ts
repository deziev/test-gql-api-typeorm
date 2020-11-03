import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthorTable1604419424996 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table author (
        "authorId" serial primary key,
        name varchar not null
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      drop table author
    `);
  }
}
