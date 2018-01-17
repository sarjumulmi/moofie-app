require 'rails_helper'

RSpec.describe Movie, type: :model do
  context 'Movie validations' do
    it {should validate_presence_of(:title)}
    it {should validate_presence_of(:ext_id)}
    it {should validate_inclusion_of(:rating).in_range(0..10)}
  end

  context 'Movie association' do
    it {should belong_to(:user)}
  end
end
