class Movie < ApplicationRecord
  validates :title, presence: true
  validates_inclusion_of :rating, in: 0..10

  has_and_belongs_to_many :lists
end
