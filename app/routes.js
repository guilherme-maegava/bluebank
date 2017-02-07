//var api = require('../api'),
var path = require('path');

module.exports  = function(app) {
    
    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('views/index.html'));
    });
};