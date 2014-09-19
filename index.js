function argsToArray(args) {
	var newArgs = new Array(args.length);

	for (var i = 0; i < newArgs.length; ++i) {
		newArgs[i] = args[i];
	}

	return newArgs;
}

function denodify(nodeStyleFunction, filter) {
	return function() {
		var functionArguments = argsToArray(arguments);

		function promiseHandler(resolve, reject) {
			function callbackFunction() {
				var args = argsToArray(arguments);

				if (filter) {
					args = filter.apply(this, args);
				}

				var error = args[0];
				var result = args[1];

				if (error) {
					return reject(error);
				}

				return resolve(result);
			}

			functionArguments.push(callbackFunction);
			nodeStyleFunction.apply(this, functionArguments);
		}

		return new Promise(promiseHandler.bind(this));
	};
}

module.exports = denodify;
