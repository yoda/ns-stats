require 'rubygems'
require 'sinatra'

set :environment, :production
set :port, 3000
disable :run, :reload

puts Dir.pwd
require "#{Dir.pwd}/ns_stats"

run Sinatra::Application
