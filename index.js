function denodify(nodeStyleFunction, filter) {
	'use strict';

	return function() {
		var self = this;
		var functionArguments = new Array(arguments.length + 1);

		for (var i = 0; i < arguments.length; i += 1) {
			functionArguments[i] = arguments[i];
		}

		function promiseHandler(resolve, reject) {
			function callbackFunction() {
				var args = new Array(arguments.length);

				for (var i = 0; i < args.length; i += 1) {
					args[i] = arguments[i];
				}

				if (filter) {
					args = filter.apply(self, args);
				}

				var error = args[0];
				var result = args[1];

				if (error) {
					return reject(error);
				}

				return resolve(result);
			}

			functionArguments[functionArguments.length - 1] = callbackFunction;
			nodeStyleFunction.apply(self, functionArguments);
		}

		return new Promise(promiseHandler);
	};
}

module.exports = denodify;
