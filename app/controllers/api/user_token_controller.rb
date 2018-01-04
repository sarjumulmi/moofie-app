class API::UserTokenController < Knock::AuthTokenController

  rescue_from Knock.not_found_exception_class_name, with: :bad_request

private
def bad_request
  render json: { errors: {messages: {error: ["Invalid credentials"]}} }, status: 404
end

def auth_params
  params.require(:auth).permit(:identifier, :password)
end

end
