import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758415434957 implements MigrationInterface {
    name = 'Migration1758415434957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "imagePath" character varying NOT NULL, "answer" character varying NOT NULL, "gameId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_e20b38d14ce0b0706c3bb482933" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_e20b38d14ce0b0706c3bb482933"`);
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
