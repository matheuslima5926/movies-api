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
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie) }

       before do
        post '/api/v1/admin/movies', params: {movie: {original_title: movie.original_title, release_date: movie.release_date, director: movie.director, gender: movie.gender}}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'Should return created movie data' do
        expect(parsed_response).to have_key("id")
      end
      it 'Should return created HTTP status' do
        expect(response).to have_http_status(201)
      end
    end

    context "when params are incorrect" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie) }

       before do
        post '/api/v1/admin/movies', params: {movie: {original_title: nil, release_date: nil, director: nil, gender: nil}}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'Should return created HTTP status' do
        expect(response).to have_http_status(422)
      end

      it 'should return the errors array' do
        expect(parsed_response).to have_key("errors")
      end
    end

    context "when user isn't admin" do
      let (:admin) { FactoryBot.create(:user, admin: false) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie, original_title:"Movie name") }

      before do
        post '/api/v1/admin/movies', params: {movie: {original_title: movie.original_title, release_date: movie.release_date, director: movie.director, gender: movie.gender}}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'Should reject request with unauthorized' do
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PUT /admin/movies/:id' do
    context "when params are correct" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie, original_title:"Movie name") }

       before do
        put "/api/v1/admin/movies/#{movie.id}", params: {movie: {original_title: "Changed Movie name", director: "New Director", gender: "Action"}}, headers: {"Authorization" => "Bearer #{admin_token}"}
        movie.reload
      end

      it 'Should return change movie data' do
        expect(parsed_response).to have_key("id")
      end

      it 'should change movie data' do
        expect(movie.original_title).to eq("Changed Movie name")
        expect(movie.director).to eq("New Director")
        expect(movie.gender).to eq("Action")
      end

      it 'Should return success HTTP status' do
        expect(response).to have_http_status(200)
      end
    end
    context "when params are incorrect" do
      let (:admin) { FactoryBot.create(:user, admin: true) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie, original_title:"Movie name") }

       before do
        put "/api/v1/admin/movies/#{movie.id}", params: {movie: {original_title: nil, director: "New Director"}}, headers: {"Authorization" => "Bearer #{admin_token}"}
        movie.reload
      end

      it 'Should return unprocessable_entity HTTP status' do
        expect(response).to have_http_status(422)
      end
    end

    context "when user isn't admin" do
      let (:admin) { FactoryBot.create(:user, admin: false) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
      let (:parsed_response) { JSON.parse(response.body) }
      let (:movie) { FactoryBot.create(:movie, original_title:"Movie name") }

       before do
        put "/api/v1/admin/movies/#{movie.id}", params: {movie: {original_title: "Changed Movie name", director: "New Director", gender: "Action"}}, headers: {"Authorization" => "Bearer #{admin_token}"}
      end

      it 'Should reject request with unauthorized' do
        expect(response).to have_http_status(401)
      end
    end
  end
  
end
