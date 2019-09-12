import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from './Spinner';

function ViewRegisteredStudents() {
	let [searchQuery, setSearchQuery] = useState('');
	let [loading, setLoading] = useState(false);
	let [registeredStudents, setRegisteredStudents] = useState([]);

	useEffect(() => {
		setLoading(true);
		axios
			.post('/search', { searchQuery })
			.then(res => {
				const data = res.data;
				if (data.success === true) setRegisteredStudents(data.students);
				else console.log(data);
			})
			.catch(err => {})
			.finally(() => {
				setLoading(false);
			});
	}, [searchQuery]);

	return (
		<div>
			<div>
				<input type='text' name='searchQuery' placeholder='name to search' onChange={e => setSearchQuery(e.target.value)} />
			</div>
			<div>
				{loading && <Spinner />}
				{!loading && (
					<table>
						<thead>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone Number</th>
							<th>College</th>
						</thead>
						<tbody>
							{registeredStudents.map(registeredStudent => (
								<tr>
									<td>{registeredStudent.sno}</td>
									<td>{registeredStudent.name}</td>
									<td>{registeredStudent.email}</td>
									<td>{registeredStudent.phoneNumber}</td>
									<td>{registeredStudent.college}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

export default ViewRegisteredStudents;
