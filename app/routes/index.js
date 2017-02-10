var api = require('../api');
var path = require('path');

module.exports  = function(app) {
    
	app.route('/v1/account/search')
		.get(api.find);

    app.route('/v1/account/create')
        .post(api.create);

    app.route('/v1/account/list')
        .get(api.list);

    app.route('/v1/account/transfer')
        .put(api.transfer);

    app.get('/views/main.html', function(req, res) {
    	res.sendFile(path.resolve('views/main.html'));
    });

    app.get('/views/accounts.html', function(req, res) {
        res.sendFile(path.resolve('views/accounts.html'));
    });

    app.get('/views/createAccount.html', function(req, res) {
        res.sendFile(path.resolve('views/createAccount.html'));
    });

    // habilitando HTML5MODE
    app.get('/transfer', function(req, res) {
        res.sendFile(path.resolve('views/index.html'));
    });

    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('views/index.html'));
    });
};