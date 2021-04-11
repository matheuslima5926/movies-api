class UserService
    def self.create_user(email, password, admin=false)
        begin
            user = User.create(email: email, password: password, admin: admin)
            if user.save
                jwt = "Bearer #{AuthenticationTokenService.call(user.id)}"
                return {user_id: user.id, email: user.email, created_at: user.created_at, jwt: jwt }
            else
                return user.errors.full_messages
            end
        rescue => exception 
            return exception
        end
    end

    def self.inactive_user(user)
        user.active = false
        user.save
    end
end
