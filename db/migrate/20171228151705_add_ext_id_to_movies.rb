class AddExtIdToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :ext_id, :integer, null: false
    add_index :movies, :ext_id
  end
end
