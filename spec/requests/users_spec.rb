require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe 'POST users' do 
    context 'when user params are correct' do
      let(:response_body) { JSON.parse(response.body) }
        before do 
            post '/api/v1/users', params: {email: "default@email.com", password: "12345678"}
        end

        it 'should return created user json when params are correct' do
          expect(response_body["email"]).to eq("default@email.com")
          expect(response_body).to have_key("user_id")
        end

        it 'should return http_status created' do
          expect(response).to have_http_status(201)
        end
    
        it 'should return user jwt token when params are correct' do
          expect(response_body).to have_key("jwt")
        end
    end
  end
end