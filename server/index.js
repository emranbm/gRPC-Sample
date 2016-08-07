/**
 * @author Mr. Coder
 * 
 */

const grpc = require('grpc');

var servicePkg = grpc.load('../service.proto').servicePkg;

const fs = require('fs');
var jsonContent = fs.readFileSync('./noobDB.json');
// A noob collection of data for service function to work with.
var persons = JSON.parse(jsonContent);

// RPC function implementation.
function serviceFunction(name, callback){
    persons.forEach((p) => {
        if(p.name == name){
            callback(null, p);
            return;
        }
    });

    callback(null, false);
}

// Make server
var server = new grpc.Server();

// Hey server! It's my service and its implementation! get it.
server.addProtoService(servicePkg.PersonFinder.service, {getPersons: serviceFunction});

// Make server to listen to port 7474
server.bind('0.0.0.0:7474', grpc.ServerCredentials.createInsecure());

// All set up. start
server.start();

console.log('listening on port 7474 ...');