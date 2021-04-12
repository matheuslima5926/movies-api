Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do

      post 'auth', to: 'authentication#create'

      resources :users, only: [:create] do
        put '/' => 'users#update', on: :collection
        delete '/' => 'users#delete', on: :collection
      end

      resources :average_score, only: [:create]

      resources :movies, only: [:index] do
        get '/' => 'movies#detail'
      end

      resources :admin, only: [] do
        post '/' => 'admin#create', on: :collection
        put '/' => 'admin#update', on: :collection
        delete '/' => 'admin#delete', on: :collection
        post '/movies' => 'admin#create_movie', on: :collection
        put '/movies/:id' => 'admin#update_movie', on: :collection
        post '/actors' => 'admin#create_actor', on: :collection
        post '/cast' => 'admin#include_actor_in_cast', on: :collection
      end
    end
  end
end
