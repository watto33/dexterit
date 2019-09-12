const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	sno: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phoneNumber: {
		type: Number,
		required: true,
		unique: true
	},
	college: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('user', userSchema);
