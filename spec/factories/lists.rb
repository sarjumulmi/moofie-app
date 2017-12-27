FactoryBot.define do
  factory :list do
    sequence(:title) {|n| "#{Faker::Lorem.word}#{n}" }
    user
  end
end
