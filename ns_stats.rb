require 'sinatra'
require 'haml'
require 'rest-client'
require 'json'

  QUERY_URL = "http://unknownworldsstats.appspot.com/statkilldata"
  VALID_BUILD_NUMBERS = (175..250).map{|n| n.to_s}
  VALID_MAP_NAMES = ['ns2_summit', 'ns2_rockdown', 'ns2_junction', 'ns2_tram' ]

  get '/' do
    haml :index
  end

  get '/:build_number/:map_name' do |build_number, map_name|
    content_type :json
    if VALID_BUILD_NUMBERS.include?(build_number) && VALID_MAP_NAMES.include?(map_name)
      begin 
        response =  RestClient.get QUERY_URL, {:params => {:version => build_number, :map => map_name}}
      rescue => e
        e.response
      end
    end
  end
