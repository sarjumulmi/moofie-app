class CreateMovies < ActiveRecord::Migration[5.1]

  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.integer :ext_id, index: {unique: true}, null: false
      t.string :poster_path
      t.integer :rating
      t.string :genres
      t.string :overview
      t.string :release_year
      t.string :production_companies
      t.string :tagline
      t.string :runtime
      t.string :url
      t.references :user, foreign_key: true, null: false
      
      t.timestamps
    end
  end
end
