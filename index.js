module.exports = function(fun) {
	return function() {
		var args = Array.prototype.slice.call(arguments, 0);
		return new Promise(function(resolve, reject) {
			args.push(function(err) {
				if (err) {
					reject(err);
				} else {
					resolve(Array.prototype.slice.call(arguments, 1));
				}
			});
			fun.apply(this, args);
		}.bind(this));
	};
};
