require 'rails_helper'

RSpec.describe User, type: :model do
  context 'User validations' do
    it {should validate_presence_of(:username)}
    it {should validate_presence_of(:email)}
    it {should validate_presence_of(:password)}
    it {should validate_presence_of(:password_confirmation)}
  end

  context 'User has secure password' do
    it { should have_secure_password }
  end

  context 'User association' do
    it {should have_many(:movies)}
  end
end
