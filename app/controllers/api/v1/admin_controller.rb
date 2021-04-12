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


    def create_movie
        begin
            @request = MovieService.create_movie(movie_params[:original_title], movie_params[:release_date], movie_params[:director], movie_params[:gender])
            if @request[:id].present?
                return render json: @request, status: :created
            end
        rescue => exception
            render json: {message: "check if the paylod is correct", errors: @request}, status: :unprocessable_entity
        end
    end

    def update_movie
        @movie = Movie.find_by(id: params[:id])
        if @movie.update(movie_params)
            return render json: @movie.to_view, status: :ok
        end
        return render json: @movie.errors.full_messages, status: :unprocessable_entity
    end

    def create_actor
        @actor = Actor.create(actor_params)    
        if @actor.save
            return render json: @actor.to_view, status: :created
        end
        return render json: {errors: @actor.errors.full_messages}, status: :unprocessable_entity
    end

    def include_actor_in_cast
        @request = MovieService.add_actor_to_movie_cast(params[:movie_id],params[:actor_id])
        return render json: {message: "success"}, status: :ok if @request
        return render json: {message: "invalid movie or actor"}, status: :unprocessable_entity
    end

    def check_admin
        return render json: {}, status: :unauthorized if !current_user.admin
    end

    private
        def admin_params
            params.permit(:email, :password)
        end

        def movie_params
            params.require(:movie).permit(:original_title, :release_date, :director, :gender)
        end

        def actor_params
            params.require(:actor).permit(:name)
        end

        def cast_params
            params.permit(:actor_id, :movie_id)
        end
end
