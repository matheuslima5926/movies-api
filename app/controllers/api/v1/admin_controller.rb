class Api::V1::AdminController < ApplicationController
    before_action :check_admin

    def create
        begin
            @request = AdminService.create_admin(admin_params[:email], admin_params[:password])
            if @request[:user_id].present?
                return render json: @request, status: :created
            end
        rescue => exception
            return render json: {errors: @request}, status: :unprocessable_entity
        end
    end

    def update
        if current_user.update(admin_params)
            return render json: current_user.to_view, status: :ok
        else
            return render json: {errors: current_user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def delete
        return render json: {deleted: true}, status: :no_content if AdminService.inactive_admin(current_user)
        return render json: {}, status: :unprocessable_entity
    end

    def check_admin
        return render json: {}, status: :unauthorized if !current_user.admin
    end

    private
        def admin_params
            params.permit(:email, :password)
        end
end
