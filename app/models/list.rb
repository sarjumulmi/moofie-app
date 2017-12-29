class List < ApplicationRecord

  validates :title, :user_id, presence: true
  validates :title, uniqueness: true

  belongs_to :user, dependent: :destroy
  has_many :list_movies
  has_many :movies, through: :list_movies

end
