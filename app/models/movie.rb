class Movie < ApplicationRecord
  validates :title, :ext_id, presence: true
  validates_inclusion_of :rating, in: 0..10

  has_many :list_movies
  has_many :lists, through: :list_movies
end
