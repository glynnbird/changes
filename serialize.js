require('dotenv').load();

var cloudant = require('cloudant')({account: process.env.ACCOUNT}),
  mydb = cloudant.db.use(process.env.DB),
  async = require('async'),
  fs = require('fs'),
  statefile = "state.json",
  outputfile = "output.txt",
  last_seq = null;
  
// setup an async queue to process changes one at a time
var q = async.queue(function(task, callback) {
  var values =  Object.keys(task).map(function(key){return task[key]})
  fs.appendFile(outputfile, values.join("\t")+"\n", callback);
}, 1); 
 
 
// save the last_seq every minute
setInterval(function() {
  if (last_seq != null) {
    fs.writeFileSync(statefile, JSON.stringify({ last_seq: last_seq}));    
  }
}, 60 * 1000);  

// listen to the changes feed
var options = { since: 'now', include_docs:true };
try {
  var state = JSON.parse(fs.readFileSync(statefile));
  options.since = state.last_seq;  
} catch (e) {
}
console.log("Listening to the", process.env.DB, "_changes feed from", options.since);
var feed = mydb.follow(options);
feed.on('change', function (change) {
  // add an item to the queue
  q.push(change.doc);
  last_seq = change.seq;
  console.log("New change:", last_seq);
});
feed.follow()
