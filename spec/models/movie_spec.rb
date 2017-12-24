require 'rails_helper'

RSpec.describe Movie, type: :model do
  context 'List validations' do
    it {should validate_presence_of(:title)}
    it {should validate_inclusion_of(:rating).in_range(0..10)}
    # it {should validate_presence_of(:movie_id)}
  end

  context 'Movie association' do
    it {should have_and_belong_to_many(:lists)}
  end
end
