require 'rails_helper'

RSpec.describe 'Lists API', type: :request do

  describe 'GET /api/lists' do
    context 'Authorized user' do
      let(:user_attributes1) {attributes_for(:user)}
      let!(:user1) {User.create(user_attributes1)}
      let(:user_attributes2) {attributes_for(:user)}
      let!(:user2) {User.create(user_attributes2)}
      let!(:lists1) {create_list(:list, 4, user:user1)}
      let!(:lists2) {create_list(:list, 2, user:user2)}
      before(:each) do
        post '/api/user_token', params: {"auth": {"identifier": user_attributes1[:email], "password": "password"}}
        get '/api/lists', headers: auth_header(user1)
      end

      it "responds with a status of 200" do
        expect(response).to have_http_status(200)
      end
      it "responds with a list of lists" do
        lists = JSON.parse(response.body, symbolize_names: true)
        expect(lists.size).to be(4)
        expect(lists[2][:user_id]).to eq(user1.id)
        expect(lists.map { |l| l[:title] }).not_to include(lists2.map { |l| l[:title]  })
      end
    end

    context 'Unauthorized user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:lists) {create_list(:list, 4, user:user)}
      before {get '/api/lists'}

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

    context 'Authorized user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let!(:lists) {create_list(:list, 4, user:user)}

      context 'Valid parameters' do

        let(:list_attributes) {
          {
            list: {
              title: "#{Faker::Lorem.word}-100",
              user_id: user.id
            }
          }
        }

        before {
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          post '/api/lists', headers: auth_header(user), params: list_attributes
        }

        it "response with a 201 status" do
          expect(response).to have_http_status(201)
        end
        it "returns the created list" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:title]).to eq(list_attributes[:list][:title])
        end
        it "adds the created list to the list index" do
          get '/api/lists', headers: auth_header(user)
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json.size).to be(5)
        end
      end

      context 'invalid parameters' do

        let (:list_attributes) {
          {
            list: {
              title: "",
              user_id: ""
            }
          }
        }
        before {
          post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
          post '/api/lists', headers: auth_header(user), params: list_attributes
        }
        it "returns status code of 422" do
          expect(response).to have_http_status(422)
        end
        it "returns error messages" do
          json = JSON.parse(response.body, symbolize_names: true)
          expect(json[:errors][:messages]).to eq(
            {:title=>["can't be blank"],
            :user_id=>["can't be blank"],
            :user=>["must exist"]
            })
        end
      end

    end

    context 'Unauthorized user' do
      let(:user_attributes) {attributes_for(:user)}
      let!(:user) {User.create(user_attributes)}
      let(:list_attributes) {
        {
          list: {
            title: "#{Faker::Lorem.word}-100",
            user_id: user.id
          }
        }
      }
      before {
        post '/api/lists', params: list_attributes
      }

      it "returns a status of 401" do
        expect(response).to have_http_status(401)
      end
      it "returns an error message" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:errors][:messages]).to eq(["User is Unauthorized"])
      end

    end

  end

  describe 'GET /api/lists/:id' do
    let(:user_attributes) {attributes_for(:user)}
    let!(:user) {User.create(user_attributes)}
    let!(:lists) {create_list(:list, 4, user:user)}
    let(:list_id) {lists[2].id}

    context 'Authorized user' do

      before {
        post '/api/user_token', params: {"auth": {"identifier": user_attributes[:email], "password": "password"}}
        get "/api/lists/#{list_id}", headers: auth_header(user)
      }

      it "response with a 200 status" do
        expect(response).to have_http_status(200)
      end
      it "returns the list" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:title]).to eq(lists[2][:title])
      end

    end

    context 'UnAuthorized user' do
      before {
        get "/api/lists/#{list_id}"
      }

      it "returns a status of 401" do
        expect(response).to have_http_status(401)
      end
      it "returns an error message" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:errors][:messages]).to eq(["User is Unauthorized"])
      end

    end

  end

end
