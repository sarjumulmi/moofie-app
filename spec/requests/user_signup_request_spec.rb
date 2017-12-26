require 'rails_helper'

RSpec.describe 'User signup API', type: :request do

  describe 'POST /api/signup' do

    context 'Valid request' do
      let(:valid_user_attributes) {
        {
          user: {
            username: Faker::Internet.user_name,
            email: Faker::Internet.email,
            password: "password",
            password_confirmation: "password"
          }
        }
      }
      before {post '/api/signup', params: valid_user_attributes}
      it 'returns a status code of 201' do
        expect(response).to have_http_status(201)
      end

      it 'creates a user and returns it in JSON' do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json).not_to be_empty
        expect(json[:username]).to eq(valid_user_attributes[:user][:username])
        expect(json[:password_digest]).not_to eq(nil)
      end

    end

    context 'Invalid request' do
      let(:invalid_user_attributes) {
        {
          user: {
            username: "",
            email: "",
            password: "",
            password_confirmation: ""
          }
        }
      }
      before {post '/api/signup', params: invalid_user_attributes}
      it "returns status code of 422" do
        expect(response).to have_http_status(422)
      end
      it "returns validation errors in json" do
        json = JSON.parse(response.body, symbolize_names: true)
        expect(json[:errors][:messages]).to eq(
          {:password=>["can't be blank"],
            :username=>["can't be blank"],
            :email=>["can't be blank"],
            :password_confirmation=>["can't be blank"]
          })
      end
    end
  end

end
