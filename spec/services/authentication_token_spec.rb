require 'rails_helper'

describe AuthenticationTokenService do 
    describe '.call' do
        let(:token) {described_class.call}
        it 'returns authentication token' do
            decoded_token = JWT.decode(
                token,
                AuthenticationTokenService::HMAC_SECRET,
                true,
                {algorithm: AuthenticationTokenService::ALGORITHM_TYPE}
            )
            expect(decoded_token).to eq(
                [{"test"=>"test_token "}, {"alg"=>"HS256"}]
            )
        end
    end
end