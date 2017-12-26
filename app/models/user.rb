class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, :email, uniqueness: true

  has_many :lists

  def to_token_payload
    # Returns the payload as a hash
    {user: {
      user_id: self.id,
      username: self.username,
      email: self.email
      }
    }
  end
end
