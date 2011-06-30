load 'deploy' if respond_to?(:namespace)

ssh_options[:keys] = [File.join(ENV["HOME"], "auth", "yoda")]
ssh_options[:port] = 22
ssh_options[:user] = "ns_stats"

set :application, "ns_stats"
set :user, "ns_stats"
set :use_sudo, false
set :host, "cvcguild.com"

set :scm, :git
set :repository,  "git@github.com:yoda/ns-stats.git"
set :deploy_via, :remote_cache
set :deploy_to, "/home/#{user}/www/#{application}"

role :app, "#{host}"
role :web, "#{host}"
role :db,  "#{host}", :primary => true

set :runner, user
set :admin_runner, user

namespace :deploy do
  task :start, :roles => [:web, :app] do
    run "bundle install"
    run "cd #{deploy_to}/current && nohup thin -C thin/production_config.yml -R config.ru start"
  end

  task :stop, :roles => [:web, :app] do
    run "cd #{deploy_to}/current && nohup thin -C thin/production_config.yml -R config.ru stop"
  end

  task :restart, :roles => [:web, :app] do
    deploy.stop
    deploy.start
  end

  # This will make sure that Capistrano doesn't try to run rake:migrate (this is not a Rails project!)
  task :cold do
    deploy.update
    deploy.start
  end
end

namespace :ns_stats do
  task :log do
    run "cat #{deploy_to}/current/log/thin.log"
  end
end
