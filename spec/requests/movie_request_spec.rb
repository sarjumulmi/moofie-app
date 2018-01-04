require 'rails_helper'

RSpec.describe 'Movies API', type: :request do

  describe 'GET /api/lists/:list_id/movies' do
    context 'Authenticated user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:list) {create(:list_with_movies, user:user)}
      let (:list_id) {list.id}
      let(:movies){:list.movies}

      before(:each) do
        post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
      end

      context "Authorized user" do
        before(:each) do
          get "/api/lists/#{list_id}/movies", headers: auth_header(user)
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

      context "Unauthorized user" do
        let(:user2_attributes) {attributes_for(:user)}
        let!(:user2) {User.create(user2_attributes)}
        let!(:list2) {create(:list_with_movies, user:user2)}
        let (:list2_id) {list2.id}
        before(:each) do
          get "/api/lists/#{list2_id}/movies", headers: auth_header(user)
        end

        it "responds with a status of 403" do
          expect(response).to have_http_status(403)
        end
        it "responds with errors" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:errors][:messages]).to eq(["User not authorized"])
        end
      end
    end

    context 'Unauthenticated user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:list) {create(:list_with_movies, user:user)}
      let (:list_id) {list.id}
      before {get "/api/lists/#{list_id}/movies"}

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

      context "Authorized user" do

        let!(:list) {create(:list_with_movies, user:user)}
        let (:list_id) {list.id}
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

        context "New movie" do

          before(:each) do
            post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          end

          before do
            post "/api/lists/#{list_id}/movies", headers: auth_header(user), params: movie_attributes
          end

          it "responds with a status of 201" do
            expect(response).to have_http_status(201)
          end
          it "adds the new movie to the list" do
            expect(list.movies.size).to eq(6)
            expect(list.movies.last[:title]).to eq(movie_attributes[:movie][:title])
          end

        end

        context "Existing movie" do
          let!(:list1) {create(:list_with_movies, user:user)}
          let!(:list2) {create(:list_with_movies, user:user)}
          let (:list2_id) {list2.id}

          before do
            post "/api/lists/#{list2_id}/movies", headers: auth_header(user), params: {movie:list1.movies.last.attributes}
          end

          it "responds with a status of 201" do
            expect(response).to have_http_status(201)
          end
          it "adds the existing movie to the new list" do
            expect(list2.movies.size).to eq(6)
            movie = JSON.parse(response.body, symbolize_names: true)
            expect(movie[:title]).to eq(list1.movies.last[:title])
          end
          it "does not add a new movie to the database" do
            expect(Movie.all.size).to eq(15)
          end

        end

      end

      context "UnAuthorized user" do

        let(:user2_attributes) {attributes_for(:user)}
        let!(:user2) {User.create(user2_attributes)}
        let!(:list) {create(:list_with_movies, user:user2)}
        let (:list_id) {list.id}
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
          post "/api/lists/#{list_id}/movies", headers: auth_header(user), params: movie_attributes
        end

        it "returns a status of 403" do
          expect(response).to have_http_status(403)
        end
        it "returns an error message" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:errors][:messages]).to eq(["User not authorized"])
        end

      end

    end

  end

  describe 'GET /api/lists/:list_id/movies/id' do

    context 'Authenticated user' do

      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:list) {create(:list_with_movies, user:user)}
      let (:list_id) {list.id}
      let (:id) {list.movies.first.id}

      context "Authorized user" do

        before(:each) do
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          get "/api/lists/#{list_id}/movies/#{id}", headers: auth_header(user)
        end

        it "responds with a status of 200" do
          expect(response).to have_http_status(200)
        end

        it "returns the movie as JSON" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:title]).to eq(list.movies.first[:title])
        end

      end

      context "UnAuthorized user" do

        let(:user2_attributes) {attributes_for(:user)}
        let!(:user2) {User.create(user2_attributes)}
        before(:each) do
          post '/api/user_token', params: {"auth": {"identifier": user2_attributes[:email], "password": "password"}}
          get "/api/lists/#{list_id}/movies/#{id}", headers: auth_header(user2)
        end

        it "returns a status of 403" do
          expect(response).to have_http_status(403)
        end
        it "returns an error message" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:errors][:messages]).to eq(["User not authorized"])
        end

      end

    end

  end

end
