import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("movie_genre")
class MovieGenre {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  movie_id: string;

  @Column()
  genre_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default MovieGenre;
