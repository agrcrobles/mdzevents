
var config = require('../config.json');
var monk = require('monk');
var db = monk(config.host+'/'+config.dbname);
var collection = db.get('faqs');

// Returns all the faqs
exports.getAll = function(req, res) {
	collection.find({}, function(err, faqs){
		if (err) res.json(500, err);
		else res.json(faqs);
	});
};

// Creates a faqs
exports.create = function(req, res) {
	var body = req.body;
	collection.insert(body, function(err, faq){
		if (err) res.json(500, err);
		else res.json(201, faq);
	});
};

// Get a faq
exports.get = function(req, res) {
	var id = req.params.id;
	collection.findById(id, function(err, faq){
		if (err) res.json(500, err);
		else if (faq) res.json(faq);
		else res.send(404);
	});
};

// Updates a faq
exports.update = function(req, res) {
	var id = req.params.id;
	var body = req.body;
	delete body._id;
	collection.findAndModify({_id: id}, {$set: body}, {multi:false}, function(err, bug){
		if (err) res.json(500, err);
		else if (faq) res.json(faq);
		else res.send(404);
	});
};

// Deletes a faq
exports.del = function(req, res) {
	var id = req.params.id;
	collection.remove({_id: id}, function(err){
		if (err) res.json(500, err);
		else res.send(204);
	});
};