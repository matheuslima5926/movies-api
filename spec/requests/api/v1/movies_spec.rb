require 'rails_helper'

RSpec.describe "Api::V1::Movies", type: :request do
  describe 'GET /api/v1/movies/:movie_id' do
    let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
    let(:user_token) { AuthenticationTokenService.call(user.id) }
    let(:headers) { { "Authorization" => "Bearer #{user_token}", "Content-Type" => "application/json" } } 
    let(:parsed_response) { JSON.parse(response.body) }
    let(:movie) { FactoryBot.create(:movie) }

    context "when movie exists" do
      before do 
        get "/api/v1/movies/#{movie.id}", headers: headers
      end

      it "returns the movie data" do
        expect(parsed_response).to have_key("id")
      end
      it "have success HTTP status" do
        expect(response).to have_http_status(200)
      end
    end

    context "when movie doens't exists" do
      before do 
        get "/api/v1/movies/-1", headers: headers
      end

      it "have not_found HTTP status" do
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'GET /api/v1/movies?search=param' do
    context "when params search matches" do
      let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
      let(:user_token) { AuthenticationTokenService.call(user.id) }
      let(:headers) { { "Authorization" => "Bearer #{user_token}", "Content-Type" => "application/json" } } 
      let(:parsed_response) { JSON.parse(response.body) }
      let(:movie) { FactoryBot.create(:movie) }

      before do
        get "/api/v1/movies?search=#{movie.original_title}", headers: headers
      end

      it "return an array with movies searched by name" do
        expect(parsed_response["data"]).not_to be_empty
      end
      it "return success HTTP status code" do
        expect(response).to have_http_status(200)
      end
    end
    context "when params search doesn't matches" do
      let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
      let(:user_token) { AuthenticationTokenService.call(user.id) }
      let(:headers) { { "Authorization" => "Bearer #{user_token}", "Content-Type" => "application/json" } } 
      let(:parsed_response) { JSON.parse(response.body) }
      let(:movie) { FactoryBot.create(:movie) }

      before do
        get "/api/v1/movies?search=randomMovieName", headers: headers
      end

      it "return an empty object" do
        expect(parsed_response["data"]).to be_empty
      end

      it "return success HTTP status code" do
        expect(response).to have_http_status(200)
      end
      
    end
  end
end
