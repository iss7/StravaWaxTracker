var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name : String,
	activities : Object,
	oauth_key : String,
	email : String,
	phone_number : String
});