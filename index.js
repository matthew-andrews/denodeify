module.exports = function(fun, filter) {
	'use strict';

	return function() {
		var args = Array.prototype.slice.call(arguments, 0);
		return new Promise(function(resolve, reject) {
			args.push(function(err) {
				var args = Array.prototype.slice.call(arguments, 0);
				if (filter) {
					args = filter.apply(this, args);
				}
				if (args[0]) {
					reject(args[0]);
				} else {
					resolve(args[1]);
				}
			});
			fun.apply(this, args);
		}.bind(this));
	};
};
