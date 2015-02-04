//services
var jsonEvents = require('../services/stubbed/jsonEvents.js');

var config_app = require('../services/app.js');

exports.config = function(app) {
	// var route = '/checkit/';
	// app.get(faq_route, jsoncheck.getAll);
	// app.post(faq_route, check.create);
	// app.get(faq_route + ':id', check.get);
	// app.put(faq_route + ':id', check.update);
	// app.del(faq_route + ':id', check.del);

	var threat_route = '/events/';
	app.get(threat_route, jsonEvents.getAll);

	var app_route = '/app/';
	app.get(app_route, config_app.getConfig);

}