class AuthenticationTokenService
    HMAC_SECRET = "soningBlaning"
    ALGORITHM_TYPE = 'HS256'

    def self.call(user_id)
        payload = {user_id: user_id}
       JWT.encode payload, HMAC_SECRET, ALGORITHM_TYPE
    end

    def self.decode_token(token)
       decoded_token = JWT.decode(token, HMAC_SECRET, true, {algorith: ALGORITHM_TYPE})
       decoded_token[0]['user_id']
    end

    def self.find_user_by_token(token)
        user_id = decode_token(token)
        return User.find_by(id: user_id)
    end
    
end