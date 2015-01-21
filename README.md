# serialize.js

A simple Node.js application to demonstrate how Cloudant's changes feed can be used to write data to local text file as changes occur in the database.

Edit the serialize.js file and change <myaccount> to your personal Cloudant acccount name. The code assumes your database is world readable.
  
* clone repository
* run 'npm install'
* edit serialize.js to put your own account name in
* run 'node serialize.js'
* add a document via the Cloudant dashboard
* see a row created in "output.txt" for each document added, edited or deleted
