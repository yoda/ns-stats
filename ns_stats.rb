require 'sinatra'
require 'haml'
require 'rest-client'
require 'json'
require "rack/cache"

STAT_KILL_DATA_QUERY_URL = "http://unknownworldsstats.appspot.com/statkilldata"
STAT_END_GAME_QUERY_URL = "http://unknownworldsstats.appspot.com/displayendgamestats"
VALID_BUILD_NUMBERS = (175..250).map{|n| n.to_s}
VALID_MAP_NAMES = ['ns2_summit', 'ns2_rockdown', 'ns2_junction', 'ns2_tram' ]


use Rack::Cache

#  get '/' do
#    haml :index
#  end

before do
  cache_control :public, :must_revalidate, :max_age => 60
end

get '/statkilldata/:build_number/:map_name' do |build_number, map_name|
  content_type :json
  if VALID_BUILD_NUMBERS.include?(build_number) && VALID_MAP_NAMES.include?(map_name)
    begin 
      response =  RestClient.get STAT_KILL_DATA_QUERY_URL, {:params => {:version => build_number, :map => map_name}}
    rescue => e
      e.response
    end
  end
end

get '/statendgame/:build_number' do |build_number|
  content_type :json
  if VALID_BUILD_NUMBERS.include?(build_number)
    begin 
      response =  RestClient.get STAT_END_GAME_QUERY_URL, {:params => {:version => build_number, :output => 'json'}}
    rescue => e
      e.response
    end
  end
end
