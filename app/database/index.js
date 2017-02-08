var Datastore = require('nedb');
var dbName = require('config').get('database.name');
var db;

if(!db) {
    db = new Datastore({
        filename: dbName, 
        autoload: true 
    });
    console.log('Database ' + dbName + ' is already to use');
}

module.exports = db;