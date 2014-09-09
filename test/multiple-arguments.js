require('es6-promise/dist/commonjs/promise/polyfill').polyfill();
var denodeify = require("../");
var assert = require('assert');

function myNodeStyleFunction(callback) {
	callback(null, 'a', 'b');
}

function myFilter(err, a, b) {
	return [err, [a, b]];
}

describe('multiple arguments', function(){
	it('should pass multiple arguments to the next then', function(done) {
		var myDenodeifiedNodeStyleFunction = denodeify(myNodeStyleFunction, myFilter);
		myDenodeifiedNodeStyleFunction()
			.then(function(results) {
				assert.equal(results[0], 'a');
				assert.equal(results[1], 'b');
				done();
			});
	});
});
