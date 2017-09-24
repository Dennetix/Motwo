export const extend = (from, to) => {
	if (from == null || typeof from != "object") return from;
	if (from.constructor != Object && from.constructor != Array) return from;
	if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
		from.constructor == String || from.constructor == Number || from.constructor == Boolean)
		return new from.constructor(from);

	to = to || new from.constructor();

	for (var name in from)
		to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];

	return to;
}

export const mergeObjects = (...objects) => {
	let res = {};

	objects.forEach((obj) => {
		for(let key in obj) {
			if(typeof(obj[key]) === 'object') {
				res[key] = mergeObjects(res[key], obj[key]);
			} else {
				res[key] = extend(obj[key]);
			}
		}
	});

	return res;
}

export const isDefined = obj => {
	if(typeof(obj) === 'undefined' || obj === null) 
		return false;
	return true;
};

export const isStringAndNotEmpty = str => {
	if (typeof(str) === 'string' && str.length > 0) 
		return true;
	return false;
}

export default { extend, mergeObjects, isDefined, isStringAndNotEmpty };
