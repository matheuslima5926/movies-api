class AverageScore < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates_presence_of :user_id, :movie_id, :score
  validates :score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 4,  only_integer: true }

  def to_view
    {id: id, user_id: user_id, movie_id: movie_id, score: score, create_at: created_at}
  end
end
