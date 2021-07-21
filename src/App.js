import React from 'react';
import { BrowserRouter as Routs, Route, Switch, Redirect } from 'react-router-dom';
import Error from './components/Error';
import Header from './components/Header';
import Form from './components/Form';
import Chat from './components/Chat';

export default function App() {
	return (
		<Routs>
			<Header />
			<main>
				<Switch>
					<Route path='/' exact render={() => <Form title={'Registration'} />} />
					<Route path='/login' exact render={() => <Form title={'Login'} />} />
					<Route path='/chat-list' exact render={() => (sessionStorage.getItem('token') ? <Chat /> : <Redirect to='/' />)} />
					<Route path='*' exact render={() => <Error />} />
				</Switch>
			</main>
		</Routs>
	);
}
