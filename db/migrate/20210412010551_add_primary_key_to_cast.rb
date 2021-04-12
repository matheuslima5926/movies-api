class AddPrimaryKeyToCast < ActiveRecord::Migration[6.1]
  def change
    add_index :actor_movies, [:actor_id, :movie_id], unique: true
  end
end
