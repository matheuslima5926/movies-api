require 'rails_helper'

RSpec.describe "Api::V1::Authentications", type: :request do
  describe 'POST auth' do 
    it 'authenticate user' do
        post '/api/v1/auth'
    end
  end
end