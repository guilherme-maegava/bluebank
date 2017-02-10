var db = require('../database');

var api = {};

api.find = function(req, res){
	db.findOne({number: req.query.accountNumber, bankBranch: req.query.bankBranch }, function(err, doc) {
	    if (err) return console.log(err);
	    res.json(doc);
	});

};

api.list = function(req, res){
	db.find({}, function(err, doc) {
	    if (err) return console.log(err);
	    res.json(doc);
	});

};

api.create = function(req, res){
	db.insert(req.body, function(err, newDoc) {
	    if (err) return console.log(err);
	    res.send(newDoc._id);
	});

};

api.transfer = function(req, res){
	var newValue;
	db.findOne({_id: req.query.source }, function(err, doc) {
	    if (err) return console.log(err);
	    
	    newValue = "";
	    newValue = (parseFloat(doc.balance)-req.query.value).toString();
	    db.update({_id: req.query.source}, { $set: { balance: newValue}}, {},
		function(err,numReplaced){
			 if (err) return console.log(err);

			 db.findOne({_id: req.query.destination }, function(err, doc) {
			    if (err) return console.log(err);
			    
			    newValue = "";
			    newValue = (parseFloat(doc.balance)+parseFloat(req.query.value)).toString();
			    db.update({_id: req.query.destination}, { $set: { balance: newValue}}, {},
				function(err,numReplaced){
					 if (err) return console.log(err);

					 res.send("Amount successfully debited");
				});
			});
		});
	});
}

module.exports = api;