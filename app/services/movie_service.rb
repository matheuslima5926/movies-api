class MovieService
    def self.create_movie(original_title, release_date, director, gender)
        movie = Movie.create(original_title: original_title, release_date: release_date, director: director, gender: gender)
        if movie.save
            return movie.to_view
        end
        return movie.errors.full_messages
    end

    def self.search_movies(search_param)
        return Movie.all.map { |movie| {id: movie.id, original_title: movie.original_title } } if search_param.blank?
        query = "
            SELECT 
                m.id, 
                m.original_title, 
                m.director,
                a.name,
                m.gender 
            FROM movies m
            LEFT JOIN actor_movies am on am.movie_id = m.id
            LEFT JOIN actors a on a.id = am.id
            WHERE (
                a.name ilike '%#{search_param}%'
                or m.director ilike '%#{search_param}%'
                or m.gender ilike '%#{search_param}%'
                or m.original_title ilike '%#{search_param}%'
            )
        "
        result_set = Movie.find_by_sql(query)
        return result_set.map { |movie| { id: movie.id, original_title: movie.original_title } }
    end
end