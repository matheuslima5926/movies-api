import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MovieDirectorTable1617734404568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movie_director",
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
            name: "MovieDirectorMovie",
            referencedTableName: "movies",
            referencedColumnNames: ["id"],
            columnNames: ["movie_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "MovieDirectorDirector",
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
    await queryRunner.dropTable("movie_director");
  }
}
