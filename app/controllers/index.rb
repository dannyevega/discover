require 'httparty'

get '/' do
  erb :login
end

get '/users/new' do
  @error = "password must be longer than 6 characters" if params[:tooshort]
  erb :signup
end

post '/users' do
  user_form = params[:user]
  @user = User.new
  @user.name = user_form[:name]
  @user.email = user_form[:email]
  if user_form[:password].length >= 6
    @user.password = user_form[:password]
    @user.save
    session[:user_id] = @user.id
    erb :index
  else
    erb :signup
    redirect '/users/new?tooshort=true'
  end
end

get '/sessions/new' do
  @error = "Invalid password or incorrect Email address" if params[:invalid]
  erb :login
end

post '/sessions' do
  @user = User.find_by(email: params[:email])
  if @user && @user.password == params[:password]
    session[:user_id] = @user.id
    erb :index
  else
    redirect '/sessions/new?invalid=true'
  end
end

delete '/sessions/:id' do
  session[:user_id] = nil
  redirect '/'
end

get '/artists/info' do
  response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{params[:artist]}&api_key=2f92db75c90c73893b9ffa855cad72d8&format=json")
  content_type :json
  response.to_json
end