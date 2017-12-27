class API::ListsController < ApplicationController
before_action :authenticate_user

def index
    lists = List.where('user_id=?', current_user)
    render json: lists, status: 201
end

end
