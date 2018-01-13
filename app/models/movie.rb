class Movie < ApplicationRecord
  validates :title, :ext_id, presence: true
  validates_inclusion_of :rating, in: 0..10

  belongs_to :user, dependent: :destroy

end
