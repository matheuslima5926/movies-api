class Movie < ApplicationRecord
    validates_presence_of :original_title, :release_date, :director
    def to_view
        return {id: id, original_title: original_title, release_date: release_date, director: director }
    end
end
