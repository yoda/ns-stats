require 'sinatra'
require 'haml'
require 'rest-client'
require 'json'

  QUERY_URL = "http://unknownworldsstats.appspot.com/statkilldata"

  get '/' do
    haml :index
  end

  get '/:build_number/:map_name' do |build_number, map_name|
    content_type :json
    begin 
      response =  RestClient.get QUERY_URL, {:params => {:version => build_number, :map => map_name}}
    rescue => e
      e.response
    end
  end
