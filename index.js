/**
 * Primary file for the API
 * Author: Karl G. Zafiris
 * Callsign: loxsat
 */

// Dependencies
var http = require('http');
var url = require('url');
var strDecoder = require('string_decoder').StringDecoder;

// Definitions
var port = 3000;

// Serve responds to all requests with a string
var server = http.createServer((req, res) => {

    // Get and parse url
    var parsed = url.parse(req.url, true);

    // Get path of the url 
    var path = parsed.pathname;
    var trimmed = path.replace(/^\/+|\/+$/g, '');
    
    // Get query string as an object 
    var queryString = parsed.query;

    // Obtain the method
    var method = req.method.toLowerCase();

    // Get the headers
    var headers = req.headers;

    // Get the payload, if any
    var decoder = new strDecoder('utf-8');
    var buffer = '';

    // Handle incoming stream 
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    // Handle stream once it stops
    req.on('end',() => {
        buffer += decoder.end();

        // Choose handler else use notfound handler
        var chosenHandler = typeof(router[trimmed]) !== 'undefined' ? router[trimmed] : handlers.notfound;

        // Construct the data object to send to the handler
        var data = {
            trimmed, 
            queryString,
            method,
            headers,
            payload:buffer
        };

        // Route the request to the handler specified in the router 
        chosenHandler(data, (status, payload) => {

            // use the status code callback by the handler or default to 200 
            status = typeof(status) == 'number' ? status : 200;

            // use the payload callback or default an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert payload to a string 
            var payloadString = JSON.stringify(payload); // payload sending back to the user 

            // return the response 
            res.writeHead(status);
            res.end(payloadString);

            console.log('Status code: ' + status + '\nPayload: ' + payloadString);

        });

    });

});

// Start the serve and have it listen to the port 3000
server.listen(port, () => {
    console.log('Server running on port '+ port + ' ...');
});

// ---- Router logic ---- //
// Define handlers 
var handlers = {};

// Root handler
handlers.root = (data, callback) => {
    // callback an http status code and a payload object 
    callback(200, {'name':'home handler'});
};

// Not found handler 
handlers.notfound = (data, callback) => {
    callback(404);
};

// Define a router 
var router = {
    'home' : handlers.root
};













