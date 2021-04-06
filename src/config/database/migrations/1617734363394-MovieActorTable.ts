import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MovieActorTable1617734363394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movie_actor",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "movie_id",
            type: "uuid",
          },
          {
            name: "person_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "MovieActorMovie",
            referencedTableName: "movies",
            referencedColumnNames: ["id"],
            columnNames: ["movie_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "MovieActorActor",
            referencedTableName: "people",
            referencedColumnNames: ["id"],
            columnNames: ["person_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movie_actor");
  }
}
