/**
 * Primary file for the API
 * Author: Karl G. Zafiris
 * Callsign: loxsat
 */

// Dependencies
var http = require('http');
var port = 3000;

// Serve responds to all requests with a string
var server = http.createServer((req, res) => {
    res.end('Hello World');
});

// Start the serve and have it listen to the port 3000
server.listen(port, () => {
    console.log('Server running on port '+ port + ' ...');
});



