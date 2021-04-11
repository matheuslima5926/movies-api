class ApplicationController < ActionController::API
    before_action :authenticate

    def current_user
        if !user_id_from_token.blank?
            user = User.find_by(id: user_id_from_token)
            if user.present?
                @current_user ||= user
            end
        end
    end

    def authenticate
        render json: {}, status: :unauthorized unless current_user.present? && current_user.active
    end

    def user_id_from_token
        begin
            if request.headers["Authorization"].present?
                bearer_token = request.headers["Authorization"].split(" ")[1]
                return AuthenticationTokenService.decode_token(bearer_token)
            end
        rescue => ex
        end
    end
end
