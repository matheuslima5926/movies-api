class Api::V1::UsersController < ApplicationController
    skip_before_action :authenticate, only: [:create]

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

    def update
        if current_user.update(user_params)
            return render json: current_user.to_view, status: :ok
        else
            return render json: {errors: current_user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def delete
        return render json: {deleted: true}, status: :no_content if UserService.inactive_user(current_user)
        return render json: {}, status: :unprocessable_entity
    end

    private
        def user_params
            params.permit(:email, :password)
        end
end
