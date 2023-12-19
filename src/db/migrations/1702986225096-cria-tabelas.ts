import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaTabelas1702986225096 implements MigrationInterface {
  name = 'CriaTabelas1702986225096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "senha" character varying(255) NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "delete_At" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "enderecos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo_endereco" character varying(100) NOT NULL, "cep" character varying(15) NOT NULL, "rua" character varying(255) NOT NULL, "numero" character varying(10) NOT NULL, "complemento" character varying(100) NOT NULL, "cidade" character varying(70) NOT NULL, "estado" character varying(70) NOT NULL, "usuarioId" uuid, CONSTRAINT "PK_208b05002dcdf7bfbad378dcac1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto_imagem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_9521d5d39cf4b36c1626cdd4fbd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" character varying(100) NOT NULL, "nome" character varying(100) NOT NULL, "valor" integer NOT NULL, "quantidade_disponivel" integer NOT NULL, "descricao" character varying(255) NOT NULL, "categoria" character varying(100) NOT NULL, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "delete_At" TIMESTAMP, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto_caracteristica" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "descricao" character varying(100) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_f5c982faff5e132a82a175505c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "enderecos" ADD CONSTRAINT "FK_3fda1857bc40b2c12b9562101ac" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagem" ADD CONSTRAINT "FK_943b51844e69e663d5f55a0c662" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristica" ADD CONSTRAINT "FK_068822fc9c15de085e8de016b3a" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produto_caracteristica" DROP CONSTRAINT "FK_068822fc9c15de085e8de016b3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produto_imagem" DROP CONSTRAINT "FK_943b51844e69e663d5f55a0c662"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enderecos" DROP CONSTRAINT "FK_3fda1857bc40b2c12b9562101ac"`,
    );
    await queryRunner.query(`DROP TABLE "produto_caracteristica"`);
    await queryRunner.query(`DROP TABLE "produtos"`);
    await queryRunner.query(`DROP TABLE "produto_imagem"`);
    await queryRunner.query(`DROP TABLE "enderecos"`);
    await queryRunner.query(`DROP TABLE "usuarios"`);
  }
}
