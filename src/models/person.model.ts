import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import Movie from "./movie.model";

@Entity("people")
class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToMany(() => Movie)
  @JoinTable({
    name: "movie_director",
    joinColumn: {
      name: "person_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
  })
  movies: Movie[];
}

export default Person;
