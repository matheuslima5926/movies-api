class Api::V1::AverageScoreController < ApplicationController
    before_action :check_user

    def create
        @average_score = AverageScoreService.create_average_score(average_socre_params[:user_id],average_socre_params[:movie_id],average_socre_params[:average])
        if @average_score[:id].present?
            return render json: @average_score, status: :created
        end
        return render json: {errors: @average_score}, status: :unprocessable_entity
    end

    def check_user
        return render json: {}, status: :unauthorized if current_user.admin
    end

    private
        def average_socre_params
            params.permit(:user_id, :movie_id, :average)
        end
end
