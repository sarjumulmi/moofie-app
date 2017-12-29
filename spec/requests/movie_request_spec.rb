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
        post '/api/user_token', params: {"auth": {"email": user_attributes[:email], "password": "password"}}
      end

      context "Authorized user" do
        before(:each) do
          get "/api/lists/#{list_id}/movies", headers: auth_header(user)
        end

        it "responds with a status of 201" do
          expect(response).to have_http_status(201)
        end
        it "responds with a list of movies" do
          movies = JSON.parse(response.body, symbolize_names: true)
          expect(movies.size).to be(5)
          expect(movies[0][:title]).to eq(movies.first[:title])
        end
      end

      context "Authorized user" do
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
  #
  # describe 'POST /api/lists' do
  #
  #   context 'Authorized user' do
  #     let(:user_attributes) {attributes_for(:user)}
  #     let!(:user) {User.create(user_attributes)}
  #     let!(:lists) {create_list(:list, 4, user:user)}
  #
  #     context 'Valid parameters' do
  #
  #       let(:list_attributes) {
  #         {
  #           list: {
  #             title: "#{Faker::Lorem.word}-100",
  #             user_id: user.id
  #           }
  #         }
  #       }
  #
  #       before {
  #         post '/api/user_token', params: {"auth": {"email": user_attributes[:email], "password": "password"}}
  #         post '/api/lists', headers: auth_header(user), params: list_attributes
  #       }
  #
  #       it "response with a 201 status" do
  #         expect(response).to have_http_status(201)
  #       end
  #       it "returns the created list" do
  #         json = JSON.parse(response.body, symbolize_names: true)
  #         expect(json[:title]).to eq(list_attributes[:list][:title])
  #       end
  #       it "adds the created list to the list index" do
  #         get '/api/lists', headers: auth_header(user)
  #         json = JSON.parse(response.body, symbolize_names: true)
  #         expect(json.size).to be(5)
  #       end
  #     end
  #
  #     context 'invalid parameters' do
  #
  #       let (:list_attributes) {
  #         {
  #           list: {
  #             title: "",
  #             user_id: ""
  #           }
  #         }
  #       }
  #       before {
  #         post '/api/user_token', params: {"auth": {"email": user_attributes[:email], "password": "password"}}
  #         post '/api/lists', headers: auth_header(user), params: list_attributes
  #       }
  #       it "returns status code of 422" do
  #         expect(response).to have_http_status(422)
  #       end
  #       it "returns error messages" do
  #         json = JSON.parse(response.body, symbolize_names: true)
  #         expect(json[:errors][:messages]).to eq(
  #           {:title=>["can't be blank"],
  #           :user_id=>["can't be blank"],
  #           :user=>["must exist"]
  #           })
  #       end
  #     end
  #
  #   end
  #
  #   context 'Unauthorized user' do
  #     let(:user_attributes) {attributes_for(:user)}
  #     let!(:user) {User.create(user_attributes)}
  #     let(:list_attributes) {
  #       {
  #         list: {
  #           title: "#{Faker::Lorem.word}-100",
  #           user_id: user.id
  #         }
  #       }
  #     }
  #     before {
  #       post '/api/lists', params: list_attributes
  #     }
  #
  #     it "returns a status of 401" do
  #       expect(response).to have_http_status(401)
  #     end
  #     it "returns an error message" do
  #       json = JSON.parse(response.body, symbolize_names: true)
  #       expect(json[:errors][:messages]).to eq(["User is Unauthorized"])
  #     end
  #
  #   end
  #
  # end
  #
  # describe 'GET /api/lists/:id' do
  #   let(:user_attributes) {attributes_for(:user)}
  #   let!(:user) {User.create(user_attributes)}
  #   let!(:lists) {create_list(:list, 4, user:user)}
  #   let(:list_id) {lists[2].id}
  #
  #   context 'Authorized user' do
  #
  #     before {
  #       post '/api/user_token', params: {"auth": {"email": user_attributes[:email], "password": "password"}}
  #       get "/api/lists/#{list_id}", headers: auth_header(user)
  #     }
  #
  #     it "response with a 200 status" do
  #       expect(response).to have_http_status(200)
  #     end
  #     it "returns the list" do
  #       json = JSON.parse(response.body, symbolize_names: true)
  #       expect(json[:title]).to eq(lists[2][:title])
  #     end
  #
  #   end
  #
  #   context 'UnAuthorized user' do
  #     before {
  #       get "/api/lists/#{list_id}"
  #     }
  #
  #     it "returns a status of 401" do
  #       expect(response).to have_http_status(401)
  #     end
  #     it "returns an error message" do
  #       json = JSON.parse(response.body, symbolize_names: true)
  #       expect(json[:errors][:messages]).to eq(["User is Unauthorized"])
  #     end
  #
  #   end
  #
  # end

end
