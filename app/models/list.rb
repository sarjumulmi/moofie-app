class List < ApplicationRecord

  validates :title, :user_id, presence: true

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :movies

end
