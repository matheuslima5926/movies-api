import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MovieGenreTable1617733651780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movie_genre",
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
            name: "genre_id",
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
            name: "MovieGenreMovie",
            referencedTableName: "movies",
            referencedColumnNames: ["id"],
            columnNames: ["movie_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "MovieGenreGenre",
            referencedTableName: "genres",
            referencedColumnNames: ["id"],
            columnNames: ["genre_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movie_genre");
  }
}
