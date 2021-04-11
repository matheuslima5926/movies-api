require 'rails_helper'

RSpec.describe "Api::V1::Admins", type: :request do
  describe "POST /admin" do
    context "with valid params" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      before do
        post '/api/v1/admin', params: {email: "adm2@email.com", password:"secreteAdmPassword"}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'return the admin key in response' do
        expect(parsed_response).to have_key("admin")
      end

      it 'have created status code' do
        expect(response).to have_http_status(201)
      end
    end

    context "with invalid params" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      before do
        post '/api/v1/admin', params: {email: nil, password:"secreteAdmPassword"}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'return the unprocessable_entity status_code' do
        expect(response).to have_http_status(422)
      end
    end

    context "when the user isn't admin" do
      let (:admin) { FactoryBot.create(:user, admin: false) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }

      before do
        post '/api/v1/admin', headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it "should reject the request with unauthorized" do
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "PUT /admin" do
    context "with valid params" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      before do
        put '/api/v1/admin', params: {email: "myNewEmail@email.com", password:"mysecreteAdmPassword"}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'return the admin key in response' do
        expect(parsed_response).to have_key("admin")
      end

      it 'have success status code' do
        expect(response).to have_http_status(200)
      end
    end
    context "with invalid params" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      before do
        put '/api/v1/admin', params: {email: nil, password:"secreteAdmPassword"}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'return the unprocessable_entity status_code' do
        expect(response).to have_http_status(422)
      end
    end

    context "when the user isn't admin" do
      let (:admin) { FactoryBot.create(:user, admin: false) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }

      before do
        put '/api/v1/admin', headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it "should reject the request with unauthorized" do
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'DELETE /admin' do
    let(:user) { FactoryBot.create(:user, email: "defaultEmail@gmail.com", password:"randomPassword", admin: true) }
    let(:user_token) { AuthenticationTokenService.call(user.id) }
    before do
      delete '/api/v1/admin', headers: {"Authorization" => "Bearer #{user_token}"}
    end

    it 'should return 204 http status' do
      expect(response).to have_http_status(204)
    end
  end

  describe 'POST /admin/movies' do
    context "when params are correct" do
      
    end
  end
end
