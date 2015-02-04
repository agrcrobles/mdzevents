'use strict';

var assert = chai.assert,  
expect = chai.expect,
	should = chai.should(); // Note that should has to be executed

//http://chaijs.com/api/bdd/
describe('Controller: faq.QueryCtrl', function () {
	this.timeout(15000);

	var endpointUrl = 'http://localhost:3333/faqs/'
	beforeEach(angular.mock.module('mdzevents.Tests'));
	
	var QueryCtrl,scope, q, rootScope;

	beforeEach(inject(function ($controller, $rootScope, $q) {
		var id = 0;
		scope = $rootScope.$new();
		QueryCtrl = $controller('faq.QueryCtrl', {
			$scope: scope,
			$routeParams: id
		});
		q = $q;
		rootScope = $rootScope;
	}));

	afterEach(inject(function ($httpBackend ) {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));

	it('should load a scope', function () {
		expect(scope).not.to.be.undefined;
	});

	it('should load a list', inject(function ($httpBackend ) {
		$httpBackend.whenGET(endpointUrl).respond('{    "id": 1,    "title": "title2",    "subject": "subject2"  }');
		scope.init().then(function() {
			expect(scope.faqs).not.to.be.undefined;
			expect(scope.faqs.id).to.equal(1);
		});		
		$httpBackend.flush();
	}));

	it('should load an item of a list', inject(function ($httpBackend ) {
		var id = 6;
		$httpBackend.whenGET(endpointUrl + id).respond('{    "id": 6,    "title": "title3",    "subject": "subject2"  }');
		scope.get(id).then(function(){
			expect(scope.item).not.to.be.undefined;
			expect(scope.item.id).to.equal(id);
		});
		$httpBackend.flush();
	}));

});


describe('Controller: faq.CommandCreateCtrl', function () {
	this.timeout(15000);

	beforeEach(angular.mock.module('PrescientTraveller.Tests'));
	var endpointUrl = 'http://localhost:3333/faqs/'

	var CommandCreateCtrl, scope, rootScope;

	beforeEach(inject(function ($controller, $rootScope) {
		var id = 0;

		rootScope = $rootScope;
		scope = $rootScope.$new();
		CommandCreateCtrl = $controller('faq.CommandCreateCtrl', {
			$scope: scope
		});
		expect(scope).not.to.be.undefined;
	}));

	afterEach(inject(function ($httpBackend ) {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}));

	var current_id = 6;

	it('should add a faq to the list', inject(function ($httpBackend ) {

		$httpBackend.whenPOST(endpointUrl + current_id).respond('{    "id": 6,    "title": "title3",    "subject": "subject2"  }');
		scope.faq.id = current_id;
		scope.faq.title = 'title6';
		scope.faq.subject = 'subject6';
		scope.add().then(function(res) {
			expect(res.id).to.equal(current_id);
		});
		$httpBackend.flush();
	}));


	it('should add a non valid faq to the list', inject(function ($httpBackend ) {

		$httpBackend.whenPOST(endpointUrl + current_id).respond('{    "message": "title undefined"  }');
		scope.faq.id = current_id;
		scope.faq.subject = 'subject6';

		scope.add().then(function(res){
			expect(res.message).to.be.equals('title undefined');
		});
		$httpBackend.flush();
	}));

});

describe('Controller: faq.CommandDeleteCtrl', function () {
	this.timeout(15000);
	var endpointUrl = 'http://localhost:3333/faqs/'

	beforeEach(angular.mock.module('PrescientTraveller.Tests'));

	var CommandCreateCtrl, scope, rootScope;

 // Initialize the controller and a mock scope
 beforeEach(inject(function ($controller, $rootScope) {

 	rootScope = $rootScope;
 	scope = $rootScope.$new();
 	CommandCreateCtrl = $controller('faq.CommandDeleteCtrl', {
 		$scope: scope
 	});
 	expect(scope).not.to.be.undefined;
 }));

 afterEach(inject(function ($httpBackend ) {
 	$httpBackend.verifyNoOutstandingExpectation();
 	$httpBackend.verifyNoOutstandingRequest();
 }));

 var current_id = 6;

 it('should remove a faq to the list', inject(function ($httpBackend ) {

 	$httpBackend.when('DELETE', endpointUrl + current_id).respond(200);

 	scope.faq.id = current_id;
 	scope.faq.title = 'title6';
 	scope.faq.subject = 'subject6';

 	scope.remove().then(function(res){
 		expect(res.id).to.equal(current_id);
 	});

 	$httpBackend.flush();
 }));
});