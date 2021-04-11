class MovieService
    def self.create_movie(original_title, release_date, director)
        movie = Movie.create(original_title: original_title, release_date: release_date, director: director)
        if movie.save
            return movie.to_view
        end
        return movie.errors.full_messages
    end
end