var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name : String,
	activities : Object,
	oauth_key : String,
	email : {type : String, unique : true},
	phone_number : String
});