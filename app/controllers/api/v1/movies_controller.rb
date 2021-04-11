class Api::V1::MoviesController < ApplicationController
    def index
        @data = MovieService.search_movies(movies_params[:search])
        return render json: {data: @data}, status: :ok
    end

    def detail
        @movie = Movie.find_by(id: params[:movie_id])
        return render json: @movie.to_view, status: :ok if @movie.present?
        return render json: {}, status: :not_found 
    end

    private
        def movies_params
            params.permit(:search)
        end
end
