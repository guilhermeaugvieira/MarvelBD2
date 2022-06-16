import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1655414615923 implements MigrationInterface {
    name = 'Initial1655414615923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS marvel`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url" ("id" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "characterId" integer, CONSTRAINT "PK_8472f6a5d5f14670614bf4da30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__image" ("id" character varying NOT NULL, "path" character varying NOT NULL, "extension" character varying NOT NULL, CONSTRAINT "PK_2588cef1f4871d5c1e44c77fb33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__comic" ("id" integer NOT NULL, "reourceURI" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a05e0dc331eac0cf59413ebda00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_comics" ("id" SERIAL NOT NULL, "characterId" integer, "comicId" integer, CONSTRAINT "PK_356eb45373268cf97050a7e1454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__story" ("id" integer NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "resourceUri" character varying NOT NULL, CONSTRAINT "PK_2dbb76681b5f1879d4e6d285f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_stories" ("id" SERIAL NOT NULL, "characterId" integer, "storyId" integer, CONSTRAINT "PK_ae02522f7664e2e84642b9f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__serie" ("id" integer NOT NULL, "name" character varying NOT NULL, "resourceUri" character varying NOT NULL, CONSTRAINT "PK_e7c45f329706fd27cd18ca6bd12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_series" ("id" SERIAL NOT NULL, "characterId" integer, "serieId" integer, CONSTRAINT "PK_079af5ce94d7b893296376bde39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "modified" TIMESTAMP NOT NULL, "resourceURI" character varying NOT NULL, "thumbnailId" character varying, CONSTRAINT "REL_d290f2b8e3ea97557a47555573" UNIQUE ("thumbnailId"), CONSTRAINT "PK_272ecbbe9daa8963005dc58077a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__event" ("id" integer NOT NULL, "name" character varying NOT NULL, "resourceUri" character varying NOT NULL, CONSTRAINT "PK_a47934ef96d0df635a11dbf6d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_events" ("id" SERIAL NOT NULL, "characterId" integer, "eventId" integer, CONSTRAINT "PK_972a8f76833ff8e637913b1518f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url" ADD CONSTRAINT "FK_bc57225eb25fcf1d4ecf3fc5a6f" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_59943bf80fe248d990e362b564c" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_9cfd71de9bd2be7f3e765db4ed8" FOREIGN KEY ("comicId") REFERENCES "marvel"."tbl__comic"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_cf18402ff868412f7898df071da" FOREIGN KEY ("storyId") REFERENCES "marvel"."tbl__story"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_9c783419b21ef905a3da367d709" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_3127f6da1acbd96b78de333eb58" FOREIGN KEY ("serieId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ADD CONSTRAINT "FK_d290f2b8e3ea97557a475555739" FOREIGN KEY ("thumbnailId") REFERENCES "marvel"."tbl__image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_532eac0dd02133882946d5a1924" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_aa35bc520e464c6870cfddc8d81" FOREIGN KEY ("eventId") REFERENCES "marvel"."tbl__event"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_aa35bc520e464c6870cfddc8d81"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_532eac0dd02133882946d5a1924"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" DROP CONSTRAINT "FK_d290f2b8e3ea97557a475555739"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_3127f6da1acbd96b78de333eb58"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_9c783419b21ef905a3da367d709"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_cf18402ff868412f7898df071da"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" DROP CONSTRAINT "FK_9cfd71de9bd2be7f3e765db4ed8"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" DROP CONSTRAINT "FK_59943bf80fe248d990e362b564c"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url" DROP CONSTRAINT "FK_bc57225eb25fcf1d4ecf3fc5a6f"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_events"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__event"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_series"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__serie"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_stories"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__story"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_comics"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__comic"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__image"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url"`);
        await queryRunner.query(`DROP SCHEMA marvel`);
    }

}
