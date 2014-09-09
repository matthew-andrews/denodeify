module.exports = function() {
	var fun = arguments[0];
	var args = Array.prototype.slice.call(arguments, 1);
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
};
