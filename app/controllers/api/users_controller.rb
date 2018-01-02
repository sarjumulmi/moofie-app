class API::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status:201
    else
      render json:{
        errors:
          {messages:@user.errors.messages}
        }, status: 422
    end

  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
