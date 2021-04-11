class CreateAverageScores < ActiveRecord::Migration[6.1]
  def change
    create_table :average_scores do |t|
      t.integer :score
      t.references :user, null: false, foreign_key: true
      t.references :movie, null: false, foreign_key: true
      t.index [:user_id, :movie_id], unique: true
      t.timestamps
    end
  end
end
