var Cloudant = require('cloudant'),
  async = require('async'),
  fs = require('fs');
  
var myaccount = "<myaccount>",
  mydb = "testdb",
  outputfile = "output.txt",
  last_seq = null;
    
  
// setup an async queue to process changes one at a time
var q = async.queue(function(task, callback) {
  var values =  Object.keys(task).map(function(key){return task[key]})
  fs.appendFile(outputfile, values.join("\t")+"\n", callback);
}, 1); 
 
  
// listen to the changes feed
Cloudant({account: myaccount}, function(er, cloudant) {
  // get changes since 'now', and include the document body
  var feed = cloudant.use(mydb).follow({since:'now', include_docs:true});
  feed.on('change', function (change) {
    // add an item to the queue
    q.push(change.doc);
    last_seq = change.seq;
    console.log(last_seq);
  });
  feed.follow()
});