class API::UserTokenController < Knock::AuthTokenController

rescue_from Knock.not_found_exception_class_name, with: :bad_request

def bad_request
  render json: { errors: {messages: ["Invalid credentials"]} }, status: 404
end

end
