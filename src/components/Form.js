import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

export default function Form({ title = 'Login' }) {
	const [state, setState] = useState({ email: '', password: '' });
	const [err, setErr] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (sessionStorage.getItem('token')) history.push('/chat-list');
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await axios.post(`${process.env.REACT_APP_SOCKET_ENDPOINT}/api/${title.toLowerCase()}`, state);
			sessionStorage.setItem('token', _.get(result, 'data.token'));
			window.location.href = '/chat-list';
		} catch (err) {
			setErr(err.response.data.msg);
			setTimeout(() => {
				setErr(false);
			}, 5000);
		}
	};

	return (
		<form className='join-block' style={{ marginTop: '200px', width: '400px', textAlign: 'center' }} onSubmit={onSubmit}>
			{err ? <h3 style={{ color: 'red' }}>{err}</h3> : null}
			<h1>{title} form!</h1>
			<input type='text' placeholder='login' value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
			<input type='password' placeholder='password' value={state.password} onChange={(e) => setState({ ...state, password: e.target.value })} />
			<button className='btn btn-success' style={{ backgroundColor: '#0c9f0cd6' }}>
				"{title}..."
			</button>
		</form>
	);
}
