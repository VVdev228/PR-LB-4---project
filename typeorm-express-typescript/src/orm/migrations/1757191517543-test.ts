import {MigrationInterface, QueryRunner} from "typeorm";

export class test1757191517543 implements MigrationInterface {
    name = 'test1757191517543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "test" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "test"
        `);
    }

}
