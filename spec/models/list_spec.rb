require 'rails_helper'

RSpec.describe List, type: :model do
  context 'List validations' do
    it {should validate_presence_of(:title)}
    it {should validate_presence_of(:user_id)}
    # it {should validate_presence_of(:movie_id)}
  end

  context 'List association' do
    it {should belong_to(:user).dependent(:destroy)}
    it {should have_and_belong_to_many(:movies)}
  end

end
