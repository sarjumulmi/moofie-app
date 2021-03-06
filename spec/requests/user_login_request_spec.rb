require 'rails_helper'

RSpec.describe 'User signup API', type: :request do
  describe 'post /api/login' do
    let!(:valid_user_attributes) {attributes_for(:user)}
    let!(:user) {User.create(valid_user_attributes)}

    context 'valid login' do
      before {post '/api/user_token', params: {"auth": {"identifier": valid_user_attributes[:email], "password": "password"}}}

      it "responds with a status 201" do
        expect(response).to have_http_status(201)
      end
      it "returns a JSON web token" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:jwt]).not_to be_empty
      end
      it "returns a web token with the logged in user information" do
        json = JSON.parse(response.body, symbolize_names: true)
        decoded_token = JWT.decode json[:jwt], Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
        expect(decoded_token[0]['username']).to eq(user.username)
      end
    end

    context 'invalid login' do
      before {post '/api/user_token', params: {"auth": {"identifier": valid_user_attributes[:email], "password": "1234"}}}

      it "responds with a status 404" do
        expect(response).to have_http_status(404)
      end
      it "returns an error message" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:errors][:messages][:error]).to eq(["Invalid credentials"])
      end
    end

  end
end
