import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1656308780416 implements MigrationInterface {
    name = 'Initial1656308780416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('marvel', true);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" DROP CONSTRAINT "FK_7d6fdc7dc79b027d421af4d64ed"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" DROP CONSTRAINT "FK_d290f2b8e3ea97557a475555739"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" RENAME COLUMN "thumbnailId" TO "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" RENAME CONSTRAINT "REL_d290f2b8e3ea97557a47555573" TO "UQ_a4d8242264a5d14b4f54d4dd825"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" DROP CONSTRAINT "REL_7d6fdc7dc79b027d421af4d64e"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" DROP COLUMN "thumbnailId"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__story" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" ADD "thumbnail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ALTER COLUMN "thumbnail" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" DROP CONSTRAINT "UQ_a4d8242264a5d14b4f54d4dd825"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ADD CONSTRAINT "UQ_a4d8242264a5d14b4f54d4dd825" UNIQUE ("thumbnail")`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ALTER COLUMN "thumbnail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__story" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" ADD "thumbnailId" integer`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" ADD CONSTRAINT "REL_7d6fdc7dc79b027d421af4d64e" UNIQUE ("thumbnailId")`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" RENAME CONSTRAINT "UQ_a4d8242264a5d14b4f54d4dd825" TO "REL_d290f2b8e3ea97557a47555573"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" RENAME COLUMN "thumbnail" TO "thumbnailId"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ADD CONSTRAINT "FK_d290f2b8e3ea97557a475555739" FOREIGN KEY ("thumbnailId") REFERENCES "marvel"."tbl__image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic" ADD CONSTRAINT "FK_7d6fdc7dc79b027d421af4d64ed" FOREIGN KEY ("thumbnailId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.dropSchema('marvel', true);
    }

}
