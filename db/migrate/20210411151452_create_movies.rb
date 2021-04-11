class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :original_title
      t.date :release_date
      t.string :director

      t.timestamps
    end
  end
end
