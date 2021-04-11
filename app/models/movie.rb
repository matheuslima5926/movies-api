class Movie < ApplicationRecord
    validates_presence_of :original_title, :release_date, :director, :gender
    has_many :average_scores
    def to_view
        return {id: id, original_title: original_title, release_date: release_date, director: director, gender: gender }
    end
end
