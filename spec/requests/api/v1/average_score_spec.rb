require 'rails_helper'

RSpec.describe "Api::V1::AverageSocres", type: :request do
  describe "POST /api/v1/average_score" do
    context "when params are correct" do
      let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
      let(:user_token) { AuthenticationTokenService.call(user.id) }
      let(:headers) { { "Authorization" => "Bearer #{user_token}", "Content-Type" => "application/json" } } 
      let(:parsed_response) { JSON.parse(response.body) }
      let(:movie) { FactoryBot.create(:movie) }
      
      before do
        post '/api/v1/average_score', params: { movie_id: movie.id, user_id: user.id, average: 4 }.to_json, headers: headers
      end

      it "returns created HTTP status code" do
        expect(response).to have_http_status(201)
      end
    end
  end
end
