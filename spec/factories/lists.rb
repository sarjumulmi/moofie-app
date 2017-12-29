FactoryBot.define do
  factory :list do
    sequence(:title) {|n| "#{Faker::Lorem.word}#{n}" }
    user
    factory :list_with_movies do
      after(:create) {|list| list.movies<<create_list(:movie, 5)}
    end
  end
end
