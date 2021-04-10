class AuthenticationTokenService
    HMAC_SECRET = "soningBlaning"
    ALGORITHM_TYPE = 'HS256'

    def self.call
        payload = {"test" => "test_token "}
       JWT.encode payload, HMAC_SECRET, ALGORITHM_TYPE
    end
    
end