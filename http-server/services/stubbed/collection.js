var _ = require('underscore');

var col = function(id, nombre, apellido ){
	this.id = id;
	this.nombre = nombre;
	this.apellido = apellido;
}

col.prototype.created = function(){
	console.log('col collection created');
}

var collection = [];
collection.push(new col(1, 'nombre2', 'apellido2'));
collection.push(new col(2, 'nombre3', 'apellido3'));


// Returns all the cols ( curl -X GET localhost:3333/cols/ )
exports.getAll = function(req, res) {
	console.log(req);
	
	res.json(collection);
};

// Creates a cols ( curl --data "id=4&nombre=nom1&apellido=ape1" localhost:3333/cols/ ) 
exports.create = function(req, res) {
	console.log(req);
	
	var body = req.body;
	collection.push(body);
	res.json(200);
};

// Get a col (  curl -X GET localhost:3333/cols/1 )
exports.get = function(req, res) {
	console.log(req);

	var id = +req.params.id;

	//if( !id ) 

	var item = _.where(collection, { id : id } );

	if (!item) 
		res.json(500, 'err');
	else 
		res.json(item);
};

// Updates a col 
//( curl -H 'Content-Type: application/json' -X PUT -d '{ nombre: 'Bob', apellido: Smith', id: 2 }' localhost:3333/cols/2 )
exports.update = function(req, res) {
	//todo: could not be tested so far
	var id =+ req.params.id;
	var body = req.body;

	console.log(body);

	var item = _.where(collection, { id : id } );

	if (item) {
		item = JSON.parse(body);

		if(!item.id) item.id = id;
		res.json(item);
	}
	else
		res.json(500, 'err');
};

// Deletes a col ( curl -X DELETE localhost:3333/cols/1 )
exports.del = function(req, res) {
	var id =+ req.params.id;

	console.log(req);	

	collection = _.reject(collection, function(item) {
		console.log(item.id + ' === '+ id + ' is ' + (item.id == id));
		return item.id == id; 
	});

	res.send(204);

}
