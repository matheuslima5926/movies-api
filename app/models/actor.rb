class Actor < ApplicationRecord
    has_many :actor_movies
    has_many :movies, :through => :actor_movies
    validates_presence_of :name
    def to_view
        return {id: id, name: name, movies: movies.pluck(:original_title)}
    end
end
