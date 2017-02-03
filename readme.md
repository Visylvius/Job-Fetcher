## Synopsis

Greetings. This is my interpretation of coding challenge that was presented to me,

## Installation
First install the npm dependencies by running

```
npm install
```
You will need 3 things installed on your computer if you don't already.
If you don't have redis installed on your machine you can use brew and install redis
```
brew install redis
```
Then you will also need Mongo installed as well.
```
brew install mongo
```
Lastly I prefer using nodemon for my node server. You can use a different service if you would like
```
npm install -g nodemon
```
You're going to need to have a redis server, mongo database, and the node server runnning at the same time.
```
redis-server /usr/local/etc/redis.conf;
brew services start mongo
```
cd into your server directory and then run
```
nodemon index.js
```

And then everything should be running, and your ready to start submitting jobs to the queue.
## API Reference

There are 3 end points
```
get '/api/jobs'
get '/api/jobs/:id'
post '/api/job'
```

I like to use postman in order to test these endpoints. 


## Tests

In order to run the tests please run
```
database=test mocha test/api-test.js
```

this will set the env variable to test and allow the test to run the before hook to make sure the test database is cleared before each round of test.
