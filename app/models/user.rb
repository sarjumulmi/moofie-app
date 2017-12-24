class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true

  has_many :lists
end
