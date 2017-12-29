class CreateListMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :list_movies do |t|
      t.integer :list_id
      t.integer :movie_id

      t.timestamps
    end
    add_index :list_movies, :list_id
    add_index :list_movies, :movie_id
  end
end
