class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: {message: "email has already been taken"}
    validates_presence_of :email
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "invalid email" }
    validates :password, :presence => true, :length => {:within => 6..40, :message => "password must have length between 6 and 40 characters"}
    def to_view
        return {user_id: id, email: email, created_at: created_at, updated_at: updated_at} if !admin
        return {user_id: id, email: email, created_at: created_at, updated_at: updated_at, admin: admin}
    end
end
