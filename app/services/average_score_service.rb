class AverageScoreService
    def self.create_average_score(user_id, movie_id, score)
        average_score = AverageScore.find_or_initialize_by(user_id: user_id, movie_id: movie_id)
        average_score.score = score
        if average_score.save
            return average_score.to_view
        end
        return average_score.errors.full_error_messages
    end
end