class ApplicationController < ActionController::Base
  include Knock::Authenticable

  protect_from_forgery with: :null_session

  private

  def unauthorized_entity(entity_name)
    render json: {errors: {messages: ["#{entity_name.titleize} is Unauthorized"] }}, status: :unauthorized
  end

end
