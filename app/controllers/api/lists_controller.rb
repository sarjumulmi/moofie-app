class API::ListsController < ApplicationController
before_action :authenticate_user

def index
  lists = List.where('user_id=?', current_user)
  render json: lists, status: 201
end

def create
  list = List.new(list_params)
  if list.save
    render json: list, status: 201
  else
    render json: {errors: {messages:list.errors.messages}}, status: 422
  end
end

private
def list_params
  params.require(:list).permit(:title, :user_id)
end

end
