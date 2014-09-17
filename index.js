module.exports = function(fun, filter) {
	return function() {

		// Don't leak arguments
		// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
		var args = new Array(arguments.length);
		for (var i = 0; i < args.length; ++i) {
			args[i] = arguments[i];
		}

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
