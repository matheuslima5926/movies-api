import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";

import Genre from "./genre.model";
import Person from "./person.model";
import Vote from "./vote.model";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  release_year: number;

  @Column()
  rating: number;

  @Column()
  duration: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: "movie_genre",
    joinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "genre_id",
      referencedColumnName: "id",
    },
  })
  genres: Genre[];

  @ManyToMany(() => Person)
  @JoinTable({
    name: "movie_actor",
    joinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "person_id",
      referencedColumnName: "id",
    },
  })
  actors: Person[];

  @ManyToMany(() => Person)
  @JoinTable({
    name: "movie_director",
    joinColumn: {
      name: "movie_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "person_id",
      referencedColumnName: "id",
    },
  })
  directors: Person[];

  @OneToMany(() => Vote, (vote) => vote.movie)
  @JoinColumn({ name: "id" })
  votes: Vote[];

  @Expose({ name: "average_votes" })
  getAverageVotes(): number | null {
    const votes = this.votes || [];
    const sum = votes.reduce((a, vote) => a + vote.grade, 0);
    const avg = sum / votes.length || 0;

    return avg || null;
  }
}

export default Movie;
