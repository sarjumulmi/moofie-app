require 'rails_helper'

RSpec.describe 'Lists API', type: :request do

  describe 'GET /api/lists' do
    context 'Authorized user' do
      let!(:user_attributes1) {attributes_for(:user)}
      let!(:user1) {User.create(user_attributes1)}
      let!(:user_attributes2) {attributes_for(:user)}
      let!(:user2) {User.create(user_attributes2)}
      let!(:lists1) {create_list(:list, 4, user:user1)}
      let!(:lists2) {create_list(:list, 2, user:user2)}
      let(:auth_header){
        token = Knock::AuthToken.new(payload: {user:
          {userId: user1.id, username: user1.username, email: user1.email}}).token
          {
          'Authorization': "Bearer #{token}"
          }
        }
      before(:each) do
        post '/api/user_token', params: {"auth": {"email": user_attributes1[:email], "password": "password"}}
        get '/api/lists', headers: auth_header
      end
      it "responds with a status of 201" do
        expect(response).to have_http_status(201)
      end
      it "responds with a list of lists" do
        lists = JSON.parse(response.body, symbolize_names: true)
        expect(lists.size).to be(4)
        expect(lists[2][:user_id]).to eq(user1.id)
        expect(lists.map { |l| l[:title] }).not_to include(lists2.map { |l| l[:title]  })
      end

    end
  end

end
