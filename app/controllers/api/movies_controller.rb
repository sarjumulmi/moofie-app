class API::MoviesController < ApplicationController
  before_action :authenticate_user, :set_list, :authenticate_current_user
  before_action :set_movie, only: [:show]

  def index
    movies = @list.movies
    if !movies.empty?
      render json: movies, status: 201
    else
      render json: [], status: 200
    end
  end



  private

  def set_list
    @list = List.find_by(id: params[:list_id], user: current_user)
  end

  def authenticate_current_user
    render json: {errors: {messages: ["User not authorized"] }}, status: 404 unless @list
  end

  def movie_params
    params.require(:movie).permit()
  end

  def set_movie
    @movie = List.find(params[:id])
  end


end
