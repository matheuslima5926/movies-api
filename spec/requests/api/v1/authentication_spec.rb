require 'rails_helper'

RSpec.describe "Api::V1::Authentications", type: :request do
  describe 'POST auth' do 
    let(:user) { FactoryBot.create(:user, email: "usr@email.com", password: "psdUser") }
    it 'return authentication token with correct params' do
        post '/api/v1/auth', params: {email: user.email, password: 'psdUser'}
        token = JSON.parse(response.body)['jwt'].split(" ")[1]
        decoded_token = JWT.decode(token, AuthenticationTokenService::HMAC_SECRET, true, {algorithm: AuthenticationTokenService::ALGORITHM_TYPE})
      expect(decoded_token).to eq([{"exp"=>(Time.now.to_i + 2.days.to_i), "user_id"=>user.id}, {"alg"=>AuthenticationTokenService::ALGORITHM_TYPE}])
    end
    it 'return authentication error when email is missing' do
      post '/api/v1/auth', params: {email: nil, password: 'psdUser'}
      expect(response).to have_http_status(401)
    end
  
    it 'return authentication error when password is missing' do
      post '/api/v1/auth', params: {email: user.email, password: nil}
      expect(response).to have_http_status(401)
    end
  end
end