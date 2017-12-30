Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    post '/signup', to: 'users#create'
    post '/user_token' => 'user_token#create'
    resources :lists, only: [:index, :create, :show] do
      resources :movies, only: [:index, :create, :show]
    end
  end
end
