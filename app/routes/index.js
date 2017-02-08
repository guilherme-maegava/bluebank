var api = require('../api');
var path = require('path');

module.exports  = function(app) {
    
	/*app.route('/v1/account/search:accountNumber')
		.get(api.find)*/

    // habilitando HTML5MODE
    app.get('/', function(req, res) {
        res.sendFile(path.resolve('views/index.html'));
    });

    app.get('/views/main.html', function(req, res) {
    	res.sendFile(path.resolve('views/main.html'));
    });
};