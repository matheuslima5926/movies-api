class Api::V1::AuthenticationController < ApplicationController
    skip_before_action :authenticate, only: [:create]

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
