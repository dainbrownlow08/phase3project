Rails.application.routes.draw do
  resources :tokens
  resources :games
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
