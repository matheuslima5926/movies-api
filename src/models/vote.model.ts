import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Movie from "./movie.model";

@Entity("votes")
class Vote {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  movie_id: string;

  @Column()
  user_id: string;

  @Column()
  grade: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToOne(() => Movie, (movie) => movie.votes)
  @JoinColumn({ name: "movie_id" })
  movie: Movie;
}

export default Vote;
