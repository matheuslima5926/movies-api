class AdminService
    def self.create_admin(email, password, admin=true)
        begin
            admin = User.create(email: email, password: password, admin: admin)
            if admin.save
                return admin.to_view
            else
                return admin.errors.full_messages
            end
        rescue => exception
            return exception
        end
    end

    def self.inactive_admin(admin)
        admin.active = false
        admin.save
    end
end