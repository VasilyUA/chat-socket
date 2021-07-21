import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import socket from '../socket';
import { Context } from '../my-hook/context';

// Components
import MyProfile from './MyProfile';
import UsersList from './UsersList';
import Messages from './Messages';

export default function Chat() {
	const [me, setMe] = useState({ email: '' });
	const [users, setUsers] = useState([]);
	const [chat, setChat] = useState({});

	const getUsers = async () => {
		let { data } = await axios
			.get(`${process.env.REACT_APP_SOCKET_ENDPOINT}/api/user-list`, { headers: { authorization: sessionStorage.getItem('token') } })
			.catch((err) => err);
		const userList = _.get(data, 'users', []);
		const listUsers = userList.filter((item) => !users.find((user) => user._id === item._id));
		if (listUsers.length !== 0) setUsers([...users, ...listUsers]);
	};

	useEffect(() => {
		socket.emit('join');
		socket.on('get_me', (user) => {
			setMe(user);
		});

		getUsers();
	}, []); // eslint-disable-line

	useEffect(() => {
		socket.on('new message', (chat) => {
			setChat(chat);
		});

		socket.on('get_offline_user', (user) => {
			const userList = users.filter((item) => item._id !== user._id);
			setUsers(userList);
		});

		socket.on('get_online_user', (user) => {
			setUsers([...users, user]);
		});
	});

	const handlerClick = (fromUserId, toUserId) => {
		socket.emit('creat:chat', fromUserId, toUserId, (chat) => {
			console.log(chat);
			setChat(chat);
		});
	};

	const onSendMessage = (object) => {
		socket.emit('creat:message', object, (chat) => {
			setChat(chat);
		});
	};

	return (
		<Context.Provider
			value={{
				handlerClick,
				onSendMessage,
			}}
		>
			<div className='container-fluid'>
				<div className='row'>
					<div className='chat-users col-sm-12 col-lg-3'>
						<MyProfile me={me} />
						<UsersList me={me} users={users} />
					</div>
					<div className='chat col-sm-12 col-lg-9'>
						<Messages chat={chat} me={me} />
					</div>
				</div>
			</div>
		</Context.Provider>
	);
}
