require 'bcrypt'

class User < ActiveRecord::Base

  validates_presence_of :name, :email, :password, presence: {
    message: "%{value} cannot be left blank." }
  validates_format_of :email, :with=> /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i, :on => :create, message: "Email address invalid. Please enter a valid Email address."

  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

end
