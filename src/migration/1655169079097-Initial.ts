import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1655169079097 implements MigrationInterface {
    name = 'Initial1655169079097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url" ("type" character varying, "url" character varying NOT NULL, "characterId" integer, CONSTRAINT "PK_f2a90dde8f7a53b8b9b4734faee" PRIMARY KEY ("url"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__image" ("path" character varying NOT NULL, "extension" character varying, CONSTRAINT "PK_8a490a0eab6c1f2885d7eb50047" PRIMARY KEY ("path"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__comic" ("reourceURI" character varying, "name" character varying NOT NULL, CONSTRAINT "PK_a1f9bf8ff5ac01cfa6f7c0d21df" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_comics" ("id" SERIAL NOT NULL, "characterId" integer, "comicName" character varying, CONSTRAINT "PK_356eb45373268cf97050a7e1454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__story" ("name" character varying NOT NULL, "type" character varying, "resourceUri" character varying, CONSTRAINT "PK_f4ad162d03eebbc430cd30645ec" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_stories" ("id" SERIAL NOT NULL, "characterId" integer, "storyName" character varying, CONSTRAINT "PK_ae02522f7664e2e84642b9f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__serie" ("name" character varying NOT NULL, "resourceUri" character varying, CONSTRAINT "PK_e77842253dc3ff06c923fba8236" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_series" ("id" SERIAL NOT NULL, "characterId" integer, "serieName" character varying, CONSTRAINT "PK_079af5ce94d7b893296376bde39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character" ("id" integer NOT NULL, "name" character varying, "description" character varying, "modified" TIMESTAMP, "resourceURI" character varying, "thumbnailPath" character varying, CONSTRAINT "REL_c85bf5530da19f4dda2c092def" UNIQUE ("thumbnailPath"), CONSTRAINT "PK_272ecbbe9daa8963005dc58077a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__event" ("name" character varying NOT NULL, "resourceUri" character varying, CONSTRAINT "PK_b2b80ea417fbcf07e37f7bea60e" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_events" ("id" SERIAL NOT NULL, "characterId" integer, "eventName" character varying, CONSTRAINT "PK_972a8f76833ff8e637913b1518f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url" ADD CONSTRAINT "FK_bc57225eb25fcf1d4ecf3fc5a6f" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_59943bf80fe248d990e362b564c" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_9ca4a24554d182b68e157dc45b5" FOREIGN KEY ("comicName") REFERENCES "marvel"."tbl__comic"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_4f3d5a9932724d0551f32abe7f8" FOREIGN KEY ("storyName") REFERENCES "marvel"."tbl__story"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_9c783419b21ef905a3da367d709" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_eca071d15873ee07a3d583e0abb" FOREIGN KEY ("serieName") REFERENCES "marvel"."tbl__serie"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" ADD CONSTRAINT "FK_c85bf5530da19f4dda2c092defc" FOREIGN KEY ("thumbnailPath") REFERENCES "marvel"."tbl__image"("path") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_532eac0dd02133882946d5a1924" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_d0ee94292833e58d1294aa34dfa" FOREIGN KEY ("eventName") REFERENCES "marvel"."tbl__event"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_d0ee94292833e58d1294aa34dfa"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_532eac0dd02133882946d5a1924"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character" DROP CONSTRAINT "FK_c85bf5530da19f4dda2c092defc"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_eca071d15873ee07a3d583e0abb"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_9c783419b21ef905a3da367d709"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_4f3d5a9932724d0551f32abe7f8"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" DROP CONSTRAINT "FK_9ca4a24554d182b68e157dc45b5"`);
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
    }

}
