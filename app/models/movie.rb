class Movie < ApplicationRecord

    def to_view
        return {id: id, original_title: original_title, release_date: release_date, director: director }
    end
end
