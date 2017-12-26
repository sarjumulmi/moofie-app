FactoryBot.define do
  factory :list do
    title {Faker::Lorem.word}
    user
  end
end
