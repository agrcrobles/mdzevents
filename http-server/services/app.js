// Returns app config ( curl -X GET localhost:3333/app/ )
exports.getConfig = function(req, res) {
	var config = {};
	config.AppName = "Events"
	config.current_date = new Date();
	config.current_time = Date.now().getTime();
	console.log(req);
	res.json(config);
	}