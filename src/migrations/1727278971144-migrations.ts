import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUsuario1688392166420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE usuario
      ADD COLUMN password VARCHAR(255) NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE usuario
      DROP COLUMN password;
    `);
  }
}
