class Api::V1::AuthenticationController < ApplicationController
    def create
        user = User.find_by(email: auth_params[:email])
        jwt = "Bearer #{AuthenticationTokenService.call(user.id)}"
        render json: {jwt: jwt}, status: :created
    end

    private
        def auth_params
            params.permit(:email, :password)
        end
end
