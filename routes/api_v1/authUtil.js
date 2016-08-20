var jwt = require('jwt-simple');
var config = require('../../config/database');

module.exports.getUserFromRequest = function(req) {	
	var token = getToken(req.headers);
	console.log(token)
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		return decoded.name
	} else {
		return null
	}
}

function getToken(headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};