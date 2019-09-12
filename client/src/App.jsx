import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './Register';
import ViewRegisteredStudents from './ViewRegisteredStudents';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={Register} />
				<Route exact path='/registeredStudents' component={ViewRegisteredStudents} />
			</div>
		</BrowserRouter>
	);
}

export default App;
