helpers do

  def current_user
    if(session[:user_id])
      @current ||= User.find(session[:user_id])
      @current.id
    end
  end

end
