# Moofie

Find and keep track of your favorite movies with Moofie. Moofie allows users to search movies, view their details and add their favorite movies to a watch list.

Moofie is created with Ruby on Rails in the backend and ReactJS on the frontend. The app fetches data from The Movie Database API ()

## Setup

You will need the following software:

* Git
* Ruby
* PostGreSQL

Moofie uses the ```dotenv``` gem to manage environment variables.  You will need to provide the following variables in a ```.env``` file located in the project root.

```
MOVIE_DB_API_KEY=<your movie database API key here>
SECRET_KEY_BASE=<your production JWT secret key here>
```

Run ```bundle install```, ```rake db:migrate``` and ```npm install``` after cloning the github repo. Run ```rails s``` on one terminal and open another terminal and run ```npm start```.

```
$ git clone https://github.com/sarjumulmi/moofie-app.git
$ bundle install
$ rake db:migrate
$ rake db:migrate RAILS_ENV=test
$ npm install
$ rails s
$ npm start
```

## Tests
Run ```rspec``` to run the Rails backend tests. Javascript tests will be added in the future.

## Deployment
This app will be deployed in Heroku in near future. The section will be updated with the link.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/sarjumulmi/moofie-app/issues

## License

Moofie is released on the [MIT License](./LICENSE).
