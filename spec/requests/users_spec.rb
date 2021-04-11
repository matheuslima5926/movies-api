require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe 'POST users' do 
    context 'when user params are correct' do
        before do 
            post '/api/v1/users', params: {email: "default@email.com", password: "12345678"}
        end

        it 'should return created user data when params are correct' do
            expect(JSON.parse(response.body)).to respond_to(:data)
        end

        it 'should return http_status created'
    
        it 'should return user jwt token when params are correct'
    end
  end
end