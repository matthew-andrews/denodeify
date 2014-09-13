require('es6-promise/dist/commonjs/promise/polyfill').polyfill();

var denodeify = require("../");
var assert = require('assert');

function myNodeStyleFunction(argument1, argument2, callback) {
	if (argument1 && argument2) {
		callback(null, argument1+argument2);
	} else {
		callback('Need both arguments');
	}
}

describe('denodeify with es6 promise', function(){
	it('should resolve when there are no errors', function(done) {
		var myDenodeifiedNodeStyleFunction = denodeify(myNodeStyleFunction);
		myDenodeifiedNodeStyleFunction(1, 2)
			.then(function(result) {
				assert.equal(3, result);
				done();
			}, function() {
				throw new Error('Error callback called wrongly');
			});
	});

	it('should reject when there are errors', function(done) {
		var myDenodeifiedNodeStyleFunction = denodeify(myNodeStyleFunction);
		var promise = myDenodeifiedNodeStyleFunction(1, undefined);
		assert(promise instanceof Promise);
		promise
			.then(function(result) {
				throw new Error('A Promised myNodeStyleFunction with one argument should never resolve');
			}, function(error) {
				assert.equal(error, 'Need both arguments');
				done();
			});
	});
});
