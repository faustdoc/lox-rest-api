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

        // Send response 
        res.end('lx-res');

        // Log path requested
        log = {
            request: trimmed,
            query: queryString,
            payload: buffer, 
            method,
            headers,
        };
        console.log(log);
    });



});

// Start the serve and have it listen to the port 3000
server.listen(port, () => {
    console.log('Server running on port '+ port + ' ...');
});



