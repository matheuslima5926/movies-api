require 'rails_helper'

describe AuthenticationTokenService do 
    describe '.call' do
        let(:user) { FactoryBot.create(:user) }
        let(:token) {described_class.call(user.id) }
        it 'returns authentication token' do
            decoded_token = JWT.decode(
                token,
                AuthenticationTokenService::HMAC_SECRET,
                true,
                {algorithm: AuthenticationTokenService::ALGORITHM_TYPE}
            )
            expect(decoded_token).to eq(
                [{"exp"=>(Time.now.to_i + 2.days.to_i), "user_id"=>user.id}, {"alg"=>"HS256"}]
            )
        end

        it 'raise exception when token are expired' do
            expired_date = (Time.now.to_i - 1.hours.to_i)
            payload = {user_id: user.id, exp: expired_date}
            token = JWT.encode(payload, AuthenticationTokenService::HMAC_SECRET, AuthenticationTokenService::ALGORITHM_TYPE)
            expect { AuthenticationTokenService.decode_token(token) }.to raise_exception
        end

        it 'return user by valid token' do
            user_by_token = AuthenticationTokenService.find_user_by_token(token)
            expect(user_by_token.id).to eq(user.id)
        end

        it 'raise exception searching user by invalid token' do
            expect { AuthenticationTokenService.find_user_by_token("invalidToken1234") }.to raise_exception
        end
    end
end