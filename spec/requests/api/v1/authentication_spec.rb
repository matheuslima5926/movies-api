require 'rails_helper'

RSpec.describe "Api::V1::Authentications", type: :request do
  describe 'POST auth' do 
    let(:user) { FactoryBot.create(:user, email: "usr@email.com") }
    it 'authenticate user with correct params' do
      byebug
        post '/api/v1/auth', params: {email: user.email, password: 'psdUser'}
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)).to eq({
          'token' => 'user_token123'
        })
    end
    it 'return authentication error when email is missing' do
      post '/api/v1/auth', params:  {password: 'psdUser'}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  
    it 'return authentication error when password is missing' do
      post '/api/v1/auth', params:  {email: user.email}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end