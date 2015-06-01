# serialize.js

A simple Node.js application to demonstrate how Cloudant's changes feed can be used to write data to local text file as changes occur in the database.

The Cloudant account name and database name are defined as environment variables e.g.

    export ACCOUNT=myaccount
    export DB=mydb

Alternatively, this data can be placed in a `.env` file:

    ACCOUNT=myaccount
    DB=mydb

The code assumes your database is world readable.
  
* clone repository
* run 'npm install'
* setup .env or environment variables
* run 'node serialize.js'
* add a document via the Cloudant dashboard
* see a row created in "output.txt" for each document added, edited or deleted
* state is recorded in `state.json` every minute
