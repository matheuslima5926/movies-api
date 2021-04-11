class Api::V1::AuthenticationController < ApplicationController
    skip_before_action :authenticate, only: [:create]

    def create
        return render json:{}, status: :unauthorized if (auth_params[:email].nil? || auth_params[:password].nil?)
        user = User.find_by(email: auth_params[:email])
        if (user.present? && user.active)
            jwt = "Bearer #{AuthenticationTokenService.call(user.id)}"
            return render json: {jwt: jwt}, status: :created
        end
        return render json: {}, status: :unauthorized
    end

    private
        def auth_params
            params.permit(:email, :password)
        end
end
