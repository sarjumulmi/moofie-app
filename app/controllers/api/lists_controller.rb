class API::ListsController < ApplicationController
  before_action :authenticate_user
  before_action :set_list, only: [:show]

  def index
    lists = List.where('user_id=?', current_user)
    if !lists.empty?
      render json: lists, status: 200
    else
      render json: [], status: 200
    end

  end

  def create
    list = List.new(list_params)
    if list.save
      render json: list, status: 201
    else
      render json: {errors: {messages:list.errors.messages}}, status: 422
    end
  end

  def show
    if @list
      render json: @list, status: 200
    else
      render json: {errors: {messages:["Not Found"]}}, status: 404
    end
  end

  private
  def list_params
    params.require(:list).permit(:title, :user_id)
  end

  def set_list
    @list = List.find(params[:id])
  end

end
