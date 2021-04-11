Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post 'auth', to: 'authentication#create'
      resources :users, only: [:create] do 
        put '/' => 'users#update', on: :collection
        delete '/' => 'users#delete', on: :collection
      end
    end
  end
end
