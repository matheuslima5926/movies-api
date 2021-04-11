class AddGenderToMovie < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :gender, :string
  end
end
