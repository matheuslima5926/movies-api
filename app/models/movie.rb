class Movie < ApplicationRecord
    validates_presence_of :original_title, :release_date, :director, :gender
    has_many :average_scores
    has_many :actor_movies
    has_many :actors, :through => :actor_movies

    def to_view
        return {id: id, original_title: original_title, release_date: release_date, director: director, gender: gender, users_average: users_avg_score, cast: actors.pluck(:name) }
    end

    def users_avg_score
        query = "select avg(score) users_avg_score from average_scores where movie_id = #{id}"
        result_set = ActiveRecord::Base.connection.exec_query(query)
        return result_set.first["avg"].to_i
    end
end
