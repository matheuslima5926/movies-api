class Api::V1::UsersController < ApplicationController
    def create
        begin 
            @request = UserService.create_user(user_params[:email], user_params[:password], admin=false)
            if @request[:user_id].present?
                return render json: @request, status: :created
            end
        rescue
            return render json: {errors: @request}, status: :unprocessable_entity
        end
    end

    private
        def user_params
            params.permit(:email, :password)
        end
end
