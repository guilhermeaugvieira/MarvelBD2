import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1656483247269 implements MigrationInterface {
    name = 'Initial1656483247269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema('marvel', true);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__creator" ("id" integer NOT NULL, "name" character varying NOT NULL, "resource_uri" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_417b8756c1c4329f4938631fc98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__comic_creators" ("id" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comicId" integer, "creatorId" integer, CONSTRAINT "PK_aa1bd251aef33c3178ddb7012ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url_character" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "characterId" integer, "urlId" character varying, CONSTRAINT "PK_628a671b6f8479334b4bd887985" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_events" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "characterId" integer, "eventId" integer, CONSTRAINT "PK_972a8f76833ff8e637913b1518f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__event" ("id" integer NOT NULL, "resource_uri" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "modified" TIMESTAMP, "start" TIMESTAMP, "end" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nextEventId" integer, "previousEventId" integer, CONSTRAINT "PK_a47934ef96d0df635a11dbf6d1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url_event" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "eventId" integer, "urlId" character varying, CONSTRAINT "PK_c09d1cec4875a785988b6be656c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_series" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "characterId" integer, "serieId" integer, CONSTRAINT "PK_079af5ce94d7b893296376bde39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__serie" ("id" integer NOT NULL, "resource_uri" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "start_year" integer NOT NULL, "end_year" integer NOT NULL, "modified" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nextSerieId" integer, "previousSerieId" integer, CONSTRAINT "PK_e7c45f329706fd27cd18ca6bd12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url_serie" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "serieId" integer, "urlId" character varying, CONSTRAINT "PK_ca51fc19ea70175f0b538f4e49a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url" ("id" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8472f6a5d5f14670614bf4da30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__url_comic" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "comicId" integer, "urlId" character varying, CONSTRAINT "PK_fb6f1c51271c15fa7a550b3ce28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__comic" ("id" integer NOT NULL, "resource_uri" character varying NOT NULL, "digital_id" integer NOT NULL, "title" character varying NOT NULL, "issue_number" double precision NOT NULL, "variant_description" character varying, "description" character varying, "modified" TIMESTAMP, "isbn" character varying NOT NULL, "upc" character varying NOT NULL, "diamond_code" character varying NOT NULL, "ean" character varying NOT NULL, "issn" character varying NOT NULL, "format" character varying NOT NULL, "page_count" integer NOT NULL, "thumbnail" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a05e0dc331eac0cf59413ebda00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__story" ("id" integer NOT NULL, "type" character varying NOT NULL, "resource_uri" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "modified" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "originalIssueId" integer, CONSTRAINT "PK_2dbb76681b5f1879d4e6d285f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_stories" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "characterId" integer, "storyId" integer, CONSTRAINT "PK_ae02522f7664e2e84642b9f7817" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character" ("id" integer NOT NULL, "name" character varying NOT NULL, "description" character varying, "modified" TIMESTAMP, "resource_uri" character varying NOT NULL, "thumbnail" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_272ecbbe9daa8963005dc58077a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "marvel"."tbl__character_comics" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "characterId" integer, "comicId" integer, CONSTRAINT "PK_356eb45373268cf97050a7e1454" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic_creators" ADD CONSTRAINT "FK_db4f9cef75c84dfaae8af8ac212" FOREIGN KEY ("comicId") REFERENCES "marvel"."tbl__comic"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic_creators" ADD CONSTRAINT "FK_3d4a19c1b561f77359b0588c811" FOREIGN KEY ("creatorId") REFERENCES "marvel"."tbl__creator"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_character" ADD CONSTRAINT "FK_3d5c0ed5215c632e5f2239a86f3" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_character" ADD CONSTRAINT "FK_5e2651cb2c296aa5bc7f33f3a8c" FOREIGN KEY ("urlId") REFERENCES "marvel"."tbl__url"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_532eac0dd02133882946d5a1924" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" ADD CONSTRAINT "FK_aa35bc520e464c6870cfddc8d81" FOREIGN KEY ("eventId") REFERENCES "marvel"."tbl__event"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" ADD CONSTRAINT "FK_2eafd7e99df7d09c9e2764b6937" FOREIGN KEY ("nextEventId") REFERENCES "marvel"."tbl__event"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" ADD CONSTRAINT "FK_130fc426b8d250fe8ecd41878c6" FOREIGN KEY ("previousEventId") REFERENCES "marvel"."tbl__event"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_event" ADD CONSTRAINT "FK_8c6394214f4371a55f229bacb97" FOREIGN KEY ("eventId") REFERENCES "marvel"."tbl__event"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_event" ADD CONSTRAINT "FK_bab293a12daf4d51f54368d0159" FOREIGN KEY ("urlId") REFERENCES "marvel"."tbl__url"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_9c783419b21ef905a3da367d709" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" ADD CONSTRAINT "FK_3127f6da1acbd96b78de333eb58" FOREIGN KEY ("serieId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" ADD CONSTRAINT "FK_826eeaca921bfa75a479b7443b9" FOREIGN KEY ("nextSerieId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" ADD CONSTRAINT "FK_76333455782661087e342b92b28" FOREIGN KEY ("previousSerieId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_serie" ADD CONSTRAINT "FK_921c9ff75f2b5e70cba1e6c0ef3" FOREIGN KEY ("serieId") REFERENCES "marvel"."tbl__serie"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_serie" ADD CONSTRAINT "FK_b342fbd0a53e02821a0b72f115e" FOREIGN KEY ("urlId") REFERENCES "marvel"."tbl__url"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_comic" ADD CONSTRAINT "FK_7f7aefd4c8623b7d1873c01c564" FOREIGN KEY ("comicId") REFERENCES "marvel"."tbl__comic"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_comic" ADD CONSTRAINT "FK_fbd94b4060f1657a22af1428644" FOREIGN KEY ("urlId") REFERENCES "marvel"."tbl__url"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__story" ADD CONSTRAINT "FK_b8d86951a5084dfee208862f74f" FOREIGN KEY ("originalIssueId") REFERENCES "marvel"."tbl__comic"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" ADD CONSTRAINT "FK_cf18402ff868412f7898df071da" FOREIGN KEY ("storyId") REFERENCES "marvel"."tbl__story"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_59943bf80fe248d990e362b564c" FOREIGN KEY ("characterId") REFERENCES "marvel"."tbl__character"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" ADD CONSTRAINT "FK_9cfd71de9bd2be7f3e765db4ed8" FOREIGN KEY ("comicId") REFERENCES "marvel"."tbl__comic"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" DROP CONSTRAINT "FK_9cfd71de9bd2be7f3e765db4ed8"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_comics" DROP CONSTRAINT "FK_59943bf80fe248d990e362b564c"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_cf18402ff868412f7898df071da"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_stories" DROP CONSTRAINT "FK_c1be1fa86dfd1a22fec6aa9c9f0"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__story" DROP CONSTRAINT "FK_b8d86951a5084dfee208862f74f"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_comic" DROP CONSTRAINT "FK_fbd94b4060f1657a22af1428644"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_comic" DROP CONSTRAINT "FK_7f7aefd4c8623b7d1873c01c564"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_serie" DROP CONSTRAINT "FK_b342fbd0a53e02821a0b72f115e"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_serie" DROP CONSTRAINT "FK_921c9ff75f2b5e70cba1e6c0ef3"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" DROP CONSTRAINT "FK_76333455782661087e342b92b28"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__serie" DROP CONSTRAINT "FK_826eeaca921bfa75a479b7443b9"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_3127f6da1acbd96b78de333eb58"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_series" DROP CONSTRAINT "FK_9c783419b21ef905a3da367d709"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_event" DROP CONSTRAINT "FK_bab293a12daf4d51f54368d0159"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_event" DROP CONSTRAINT "FK_8c6394214f4371a55f229bacb97"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" DROP CONSTRAINT "FK_130fc426b8d250fe8ecd41878c6"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__event" DROP CONSTRAINT "FK_2eafd7e99df7d09c9e2764b6937"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_aa35bc520e464c6870cfddc8d81"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__character_events" DROP CONSTRAINT "FK_532eac0dd02133882946d5a1924"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_character" DROP CONSTRAINT "FK_5e2651cb2c296aa5bc7f33f3a8c"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__url_character" DROP CONSTRAINT "FK_3d5c0ed5215c632e5f2239a86f3"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic_creators" DROP CONSTRAINT "FK_3d4a19c1b561f77359b0588c811"`);
        await queryRunner.query(`ALTER TABLE "marvel"."tbl__comic_creators" DROP CONSTRAINT "FK_db4f9cef75c84dfaae8af8ac212"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_comics"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_stories"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__story"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__comic"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url_comic"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url_serie"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__serie"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_series"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url_event"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__event"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__character_events"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__url_character"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__comic_creators"`);
        await queryRunner.query(`DROP TABLE "marvel"."tbl__creator"`);
        await queryRunner.dropSchema('marvel', true);
    }

}
