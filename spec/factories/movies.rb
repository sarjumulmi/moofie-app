FactoryBot.define do
  factory :movie do
    title {Faker::Lorem.word}
    poster_path {Faker::Internet.url}
    rating {Faker::Number.between(0, 10)}
    ext_id {Faker::Number.between(1, 1000000000)}
  end
end
