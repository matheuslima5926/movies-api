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
    context 'when params are incorrect' do
      before do 
        post '/api/v1/users', params: {email: "default@email.com", password: nil}
      end

      it 'should return http_status unprocessable_entity' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT users' do
    context 'when params are correct' do
      let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
      let(:user_token) { AuthenticationTokenService.call(user.id) }
      let(:parsed_response) { JSON.parse(response.body) }
      before do
        put '/api/v1/users', params: {email: "default_1@email.com", password: "12345678"}, headers: {"Authorization" => "Bearer #{user_token}"}
      end

      it 'should return 200 http status' do
        expect(response).to have_http_status(200)
      end
    end
    context 'when params are incorrect' do
      let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
      let(:user_token) { AuthenticationTokenService.call(user.id) }
      let(:parsed_response) { JSON.parse(response.body) }
      before do
        put '/api/v1/users', params: {email: nil, password: "12345678"}, headers: {"Authorization" => "Bearer #{user_token}"}
      end

      it 'should return 422 http status' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'DELETE users' do
    let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword") }
    let(:user_token) { AuthenticationTokenService.call(user.id) }
    before do
      delete '/api/v1/users', headers: {"Authorization" => "Bearer #{user_token}"}
    end

    it 'should return 200 http status' do
      expect(response).to have_http_status(200)
    end
  end
end