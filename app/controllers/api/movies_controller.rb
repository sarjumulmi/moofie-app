class API::MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user
  before_action :set_movie, only: [:show, :destroy]

  def index
    movies = current_user.movies
    if !movies.empty?
      render json: movies, status: 200
    else
      render json: [], status: 200
    end
  end

  def create
    @movie = current_user.movies.build(movie_params)
    if @movie.save
      render json: @movie, status: 201
    else
      render json: {errors: {messages:@movie.errors.messages}}, status: 422
    end

  end

  def show
    if @movie
      render json:@movie, status: 200
    else
      render json: {errors: {messages:["Not Found"]}}, status: 404
    end
  end

  def destroy
    if current_user.movies.destroy(@movie)
      render json:@movie, status: 200
    else
      render json: {errors: {messages:@movie.errors.messages}}, status: 404
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :rating, :poster_path, :ext_id, :tagline, :genres, :production_companies, :release_year, :url, :runtime, :overview)
  end

  def set_movie
    @movie = Movie.find(params[:id])
  end


end
