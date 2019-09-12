import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Spinner from './Spinner';

function Register(props) {
	let [name, setName] = useState(null);
	let [email, setEmail] = useState(null);
	let [phoneNumber, setPhoneNumber] = useState(null);
	let [college, setCollege] = useState(null);
	// let [notification, alert] = useState(null);
	let [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		alert(null);
	// 	}, 5000);
	// }, [notification]);

	function handleSubmit(e) {
		e.preventDefault();
		if (!name) return alert('Name field cannot be empty !');
		if (!email) return alert('Email field cannot be empty !');
		if (!phoneNumber) return alert('Phone number field cannot be empty !');
		if (!college) return alert('College field cannot be empty !');
		if (phoneNumber.toString().length !== 10) return alert('Phone number not valid');
		setLoading(true);
		const userData = { name, email, phoneNumber, college };
		axios
			.post('/', userData)
			.then(res => {
				const data = res.data;
				if (data.success === true) alert(`${data.msg}\nYour Registered ID is ${data.id}`);
				else {
					console.log(data.err);
					alert(data.err);
				}
			})
			.catch(err => {
				console.log(err);
				alert('No Internet Connection !');
			})
			.finally(() => setLoading(false));
	}

	return (
		<div className='App'>
			{/* {notification !== null && <div>{notification}</div>} */}
			{loading && <Spinner />}
			{!loading && (
				<html>
					<body>
				<div class="contact">
					<div class="row">
						<div class="book">
							
							<div class="book__form">
							<div class="u-margin-bottom-medium">
                                    <h2 class="heading-secondary">
                                        Registration
                                    </h2>
                                </div>
							<form onSubmit={handleSubmit}>
							<img class="image" src={require('./crypersbg.png')} width="200px" height="200px" />
							<div class="form__group">
							<input type='text' name='user' class="form__input" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
							<label for="user" class="form__label"> Full Name </label>
							</div>
							<div class="form__group">
							<input type='email' name='email' class="form__input" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
							<label for="email" class="form__label"> Email </label>
							</div>
							<div class="form__group">
								<input
									type='number'
									class="form__input"
									name='phoneNumber'
									placeholder='Phone Number'
									value={phoneNumber}
									onChange={e => setPhoneNumber(e.target.value)}
									/>
									<label for="phoneNumber" class="form__label"> Phone Number </label>
							</div>
					
							<div class="form__group">
							<input type='text' name='college' class="form__input" placeholder='College Name' value={college} onChange={e => setCollege(e.target.value)} />
							<label for="college" class="form__label"> College Name </label>
							</div>
					
							<div class="form__group">
                                    <button class="btn btn--gradient" value="submit" type="submit"> Submit </button> 
                                </div>
				</form>
							</div>
						</div>
					</div>
				</div>
				</body>
				</html>
			)}
		</div>
	);
}

export default Register;
