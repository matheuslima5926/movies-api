class AuthenticationTokenService
    HMAC_SECRET = "soningBlaning"
    ALGORITHM_TYPE = 'HS256'

    def self.call(user_id)
        payload = {user_id: user_id}
       JWT.encode payload, HMAC_SECRET, ALGORITHM_TYPE
    end
    
end