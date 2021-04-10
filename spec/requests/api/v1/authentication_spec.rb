require 'rails_helper'

RSpec.describe "Api::V1::Authentications", type: :request do
  describe 'POST auth' do 
    it 'authenticate user with correct params' do
        post '/api/v1/auth', params: {username: 'user', password: 'psdUser'}
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to eq({
          'token' => 'user_token123'
        })
    end
    it 'return authentication error when username is missing' do
      post '/api/v1/auth', params: {password: 'psdUser'}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  
    it 'return authentication error when password is missing' do
      post '/api/v1/auth', params: {username: 'user'}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end