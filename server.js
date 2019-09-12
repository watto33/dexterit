require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('server');

const userModel = require('./user.model');
const app = express();

const port = process.env.PORT;
const db = process.env.DB;
let registeredStudentsCount = 0;

app.listen(port, () => debug(`Server listening in port ${port}`));
mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('error', debug);
mongoose.connection.on('connected', async () => {
	debug(`DB connection to ${db} established successfully !`);
	const count = await userModel.countDocuments();
	debug(`Total students registed: ${count}`);
	registeredStudentsCount = count;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
	try {
		const users = await userModel.find({}, '-_id -__v');
		return res.json({ success: true, users });
	} catch (err) {
		return res.json({ success: true, err: 'Internal server error !' });
	}
});

app.post('/', async (req, res) => {
	registeredStudentsCount++;
	const regNo = '00' + registeredStudentsCount.toString();
	const userData = {
		sno: `IT${regNo.slice(-3)}`,
		name: req.body.name,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		college: req.body.college
	};
	try {
		await userModel.create(userData);
		res.json({ success: true, msg: 'User registered successfully !', id: userData.sno });
	} catch (err) {
		debug(err);
		registeredStudentsCount--;
		if (err.code === 11000) {
			if (/email_1/.test(err.errmsg)) err = 'Email has already been registered !';
			if (/phoneNumber_1/.test(err.errmsg)) err = 'Phone Number has already been registered !';
			if (/sno_1/.test(err.errmsg)) err = 'Try again !';
		}
		res.json({ success: false, err });
	}
});

app.post('/search', async (req, res) => {
	try {
		const registeredStudents = await userModel.find({ name: new RegExp(req.body.searchQuery, 'i') });
		res.json({ success: true, students: registeredStudents });
	} catch (err) {
		res.json({ success: false, err: 'Internal Server Error !' });
	}
});
