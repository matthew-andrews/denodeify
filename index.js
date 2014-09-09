module.exports = function(fun) {
	return function() {
		var args = Array.prototype.slice.call(arguments, 0);
		return new Promise(function(resolve, reject) {
			args.push(function(err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
			fun.apply(this, args);
		}.bind(this));
	}.bind(this);
};
