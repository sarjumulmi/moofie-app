class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, :email, uniqueness: true

  has_many :lists

  def self.from_token_request request
    # Returns a valid user, `nil` or raise `Knock.not_found_exception_class_name`
    email = request.params["auth"] && request.params["auth"]["email"]
    username = request.params["auth"] && request.params["auth"]["username"]
    self.where(email: email).or(self.where(username: username))[0]
  end

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
