# SSM SDK JS Web Client

## Getting started

  * Running the web client
  
Start the REST serveur from [Node.js SDK](../node/README.md) and open the web client.
The web client http requests are built in the [bcc-xmlhttp.js](./bcc-xmlhttp.js) script.

```
firefox "./index.html?host=127.0.0.1&port=8080" &
```

  * Use with node.js


```
// Needed by jsencrypt
var navigator = {};
var window = {};

// Import SSM API
var ssmApi = require("./ssm-api.js");


// User info
var prvKey = "-----BEGIN RSA PRIVATE KEY-----XXXXXXX----END RSA PRIVATE KEY-----";
var user = "Sam";


// HTTP requests
const http = require('http');

// GET requests for queries

var queryOptions = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/',
  method: 'GET'
}

// Build the query
var queryObj = ssmApi.ssmQuery("session","carsale20190301");
var queryStr = "cmd=" + encodeURIComponent(queryObj.cmd) + "&fcn=" + encodeURIComponent(queryObj.fcn);
queryObj.args.map(function(arg) {queryStr += "&args=" + encodeURIComponent(arg);});

queryOptions.path += "?" + queryStr

var jsonState;

// Perform the query
var queryReq = http.request(queryOptions, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', data => {
    jsonState = JSON.parse(data.toString());
  })
})

queryReq.on('error', error => {
  console.error(error)
})

queryReq.end()

console.log(jsonState);

// User "Sam" performs the "Update" action

jsonState.public = "Something about a car sale";
console.log(jsonState);

// POST requests for transactions

var transOptions = {
  hostname: '127.0.0.1',
  port: 8080,
  path: '/',
  method: 'POST'
}

// Build the transaction
var transObj = ssmApi.ssmPerform("Update", jsonState, user, prvKey);
var transStr = JSON.stringify(transObj);

transOptions.headers = {
  'Content-Type': 'application/json',
  'Content-Length': transStr.length
};

// Perform the transaction

var transReq = http.request(transOptions, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', data => {
    process.stdout.write(data)
  })
})

transReq.on('error', error => {
  console.error(error)
})

transReq.write(transStr)
transReq.end()

// Re-run the query to see the updated state...
```
