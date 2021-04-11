FactoryBot.define do
  factory :movie do
    original_title { "The Shinning" }
    release_date { "1980-12-25" }
    director { "Stanley Kubrick" }
    gender  { "Horror" }
  end
end
