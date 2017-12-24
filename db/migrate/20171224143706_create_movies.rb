class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :poster_path
      t.integer :rating

      t.timestamps
    end
  end
end
