import { getRepository, Repository } from "typeorm";

import { CreateMovieDTO, SearchMoviesDTO } from "../../dtos/movies";
import { Movie } from "../../models";
import { IMoviesRepository } from "../interfaces";

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async find({
    title,
    director,
    actor,
    genre,
  }: SearchMoviesDTO): Promise<Movie[] | undefined> {
    const movies = await this.ormRepository.find({
      join: {
        alias: "movies",
        leftJoin: {
          actors: "movies.actors",
          directors: "movies.directors",
          genres: "movies.genres",
        },
      },
      where: (qb) => {
        if (title) {
          qb.where("movies.title ilike :movieTitle", {
            movieTitle: `%${title}%`,
          });
        }

        if (actor) {
          qb.andWhere("actors.name ilike :actorName", {
            actorName: `%${actor}%`,
          });
        }

        if (director) {
          qb.andWhere("directors.name ilike :directorName", {
            directorName: `%${director}%`,
          });
        }

        if (genre) {
          qb.andWhere("genres.title ilike :genreName", {
            genreName: `%${genre}%`,
          });
        }
      },
      relations: ["actors", "directors", "genres", "votes"],
    });

    return movies;
  }

  public async findById(id: string): Promise<Movie | undefined> {
    const movie = await this.ormRepository.findOne({
      where: { id },
      relations: ["genres", "directors", "actors", "votes"],
    });
    return movie;
  }

  public async create({
    title,
    original_title,
    release_year,
    rating,
    duration,
  }: CreateMovieDTO): Promise<Movie> {
    const movie = this.ormRepository.create({
      title,
      original_title,
      release_year,
      rating,
      duration,
    });
    await this.ormRepository.save(movie);
    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie);
  }
}

export default MoviesRepository;
