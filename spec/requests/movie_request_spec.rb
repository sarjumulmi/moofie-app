require 'rails_helper'

RSpec.describe 'Movies API', type: :request do

  describe 'GET /api/movies' do
    context 'Authenticated user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let (:user_id) {user.id}
      let! (:movies){create_list(:movie, 5, user:user)}

      before(:each) do
        post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
      end

      context "Authorized user" do
        before(:each) do
          get "/api/movies", headers: auth_header(user)
        end

        it "responds with a status of 200" do
          expect(response).to have_http_status(200)
        end
        it "responds with a list of movies" do
          movies = JSON.parse(response.body, symbolize_names: true)
          expect(movies.size).to be(5)
          expect(movies[0][:title]).to eq(movies.first[:title])
        end
      end

    end

    context 'Unauthenticated user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let (:user_id) {user.id}
      let(:movies){create_list(:movie, 5, user:user)}

      before {get "/api/movies"}

      it "returns a status of 401" do
        expect(response).to have_http_status(401)
      end
      it "returns an error message" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:errors][:messages]).to eq(["User is Unauthorized"])
      end
    end

  end

  describe 'POST /api/lists' do

    context 'Authenticated user' do

      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let(:user_id) {user.id}
      let!(:movies) {create_list(:movie, 5, user: user)}

      context "Authorized user" do

        let(:movie_attributes){
          {
            movie: {
              title: "#{Faker::Lorem.word}-100",
              poster_path: Faker::Internet.url,
              rating: Faker::Number.between(0, 10),
              ext_id: Faker::Number.between(1, 1000000000)
            }
          }
        }

        before(:each) do
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
        end

        before do
          post "/api/movies", headers: auth_header(user), params: movie_attributes
        end

        it "responds with a status of 201" do
          expect(response).to have_http_status(201)
        end
        it "adds the new movie to the list" do
          expect(user.movies.size).to eq(6)
          expect(user.movies.last[:title]).to eq(movie_attributes[:movie][:title])
        end

      end

    end

  end

  describe 'GET /api/movies/id' do

    context 'Authenticated user' do

      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:movies) {create_list(:movie, 5, user:user)}
      let (:user_id) {user.id}
      let (:id) {user.movies.first.id}

      context "Authorized user" do

        before(:each) do
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          get "/api/movies/#{id}", headers: auth_header(user)
        end

        it "responds with a status of 200" do
          expect(response).to have_http_status(200)
        end

        it "returns the movie as JSON" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:title]).to eq(user.movies.first[:title])
        end

      end

    end

  end

  describe 'DELETE /api/movies/id' do

    context 'Authenticated user' do

      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:movies) {create_list(:movie, 5, user:user)}
      let (:user_id) {user.id}
      let! (:movie) {movies.first}
      let (:id) {user.movies.first.id}

      context "Authorized user" do

        before do
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          delete "/api/movies/#{id}", headers: auth_header(user)
        end

        it "responds with a status of 200" do
          expect(response).to have_http_status(200)
        end

        it "removes movie from the user's movie list" do
          expect(user.movies).not_to include(movies.first)
        end

        it "returns the deleted movie as JSON" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:title]).to eq(movies.first[:title])
        end

      end

    end

  end

end
