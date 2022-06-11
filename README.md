# Hi :)

This is the server side for the app 'Purple House'.

[For Client side](https://github.com/trynx/purple_house_client)

This is an Express Nodejs server which connects to MongoDB with mongoose.

# Run server

## Regular

Use `npm run watch` to run the server with nodemon.

## Debugging

If you're using VS code, just run F5(debugging), and it will run the `npm run watch` command and attach a debugger.

# Run MongoDB

After you have the local MongoDB installed and your db folder ` C:\\data\\db\\`, run `npm run dbon`.

# Tests

## Postman

If you want to test the server and the api's after the server is running, you can use Postman and import this collection: https://www.getpostman.com/collections/84807d365549e4b49563

To import the link: File -> Import -> Link

## Automatic tests

To run automatic tests, first verify that you aren't running the server, then do `npm run test`.
