/**
 * Client side
 * 
 * @author Mr. Coder
 */

const grpc = require('grpc');

var servicePkg = grpc.load('../service.proto').servicePkg;

var personFinder = new servicePkg.PersonFinder('localhost:7474', grpc.credentials.createInsecure());

var name;
if (process.argv.length > 2)
    name = process.argv[2];
else{
    name = 'emran';
}
console.log('query for: ' + name);

var filter = {
    name: name
}

personFinder.getPerson(filter, (err, person) => {
    console.log(person); 
});