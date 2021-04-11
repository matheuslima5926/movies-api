class Api::V1::AuthenticationController < ApplicationController
    def create
        user = User.find_by(email: params[:email])
        jwt = "Bearer #{AuthenticationTokenService.call(user.id)}"
        render json: {jwt: jwt}, status: :created
    end

    private
        def auth_params
            params.require(:auth).permit(:email, :password)
        end
end
