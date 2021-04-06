import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("movie_director")
class MovieDirector {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  movie_id: string;

  @Column()
  person_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default MovieDirector;
