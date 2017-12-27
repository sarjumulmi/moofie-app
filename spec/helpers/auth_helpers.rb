module AuthHelpers

  def auth_header(user)
    token = Knock::AuthToken.new(payload:
      {user:
        {userId: user.id, username: user.username, email: user.email}}).token
      {
      'Authorization': "Bearer #{token}"
      }
  end
end
