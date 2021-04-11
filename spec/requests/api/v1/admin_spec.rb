require 'rails_helper'

RSpec.describe "Api::V1::Admins", type: :request do
  describe "POST /admin" do
    context "with valid params" do
      let (:admin) { FactoryBot.create(:user) }
      let (:admin_token) { AuthenticationTokenService.call(admin.id) }
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
end
