class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :username, :email, uniqueness: true

  has_many :movies

  def self.from_token_request request
    # Returns a valid user, `nil` or raise `Knock.not_found_exception_class_name`
    identifier = request.params["auth"] && request.params["auth"]["identifier"]
    self.where(email: identifier).or(self.where(username: identifier))[0]
  end

  # change payload structure to be sent as Authorization header to {user: {userId: , username: , email: }}
  def self.from_token_payload payload
    self.find payload["user"]["userId"]
  end

  def to_token_payload
    # Returns the payload as a hash
    {user: {
      userId: self.id,
      username: self.username,
      email: self.email
      }
    }
  end
end
