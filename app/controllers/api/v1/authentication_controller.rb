class Api::V1::AuthenticationController < ApplicationController
    def create
        render json: {token: 'user_token123'}, status: :created
    end

    private
        def auth_params
            params.require(:auth).permit(:username, :password)
        end
end
