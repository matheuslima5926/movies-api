class User < ApplicationRecord
    has_secure_password
    validates :email, uniqueness: {message: "email has already been taken"}
end
