import React, {useEffect, useState} from 'react'
import axios from 'axios';
import socket from "../socket";
import {Context} from "../my-hook/context";

// Components
import MyProfile from "./MyProfile";
import UsersList from "./UsersList";
import Messages from "./Messages";

export default function Chat() {
    const [me, setMe] = useState({email: ""});
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState({});

    const getUsers = async () => {
        let {data: {users: userList = []}} = await axios.get('http://localhost:3001/user-list', {headers: {authorization: sessionStorage.getItem('token')}}).catch(err => err);
        const listUsers = userList.filter(item => !users.find(user => user._id === item._id));
        if (listUsers.length !== 0) setUsers([...users, ...listUsers]);
    }

    useEffect(() => {
        getUsers();
        socket.emit('join', data => {
            setMe(data);
        });
        socket.on('get_online_users', user => {
            const checkUserOnline = users.find(item => item._id === user._id);
            if (!checkUserOnline && user) setUsers([...users, user]);
        });
        socket.emit('get:chat', localStorage.getItem('chatId'), chat => {
            setChat(chat);
        });
    }, []);  // eslint-disable-line

    useEffect(() => {
        socket.on('get_offline_users', usersId => {
            const checkUserOnline = users.find(item => item._id === usersId);
            const removesUser = users.filter(item => item._id !== usersId);
            if (checkUserOnline) setUsers(removesUser);
        });
        socket.on('new message', chat => {
            setChat(chat);
        });

    });


    const handlerClick = (fromUserId, toUserId) => {
        socket.emit('creat:chat', fromUserId, toUserId, chat => {
            setChat(chat);
            localStorage.setItem('chatId', chat._id);
        });
    };

    const onSendMessage = object => {
        socket.emit('creat:message', object, chat => {
            setChat(chat);
        });
    }

    return (
        <Context.Provider value={{
            handlerClick,
            onSendMessage
        }}>
            <div className="chat" style={{marginTop: '40px'}}>
                <div className="chat-users">
                    <MyProfile me={me}/>
                    <UsersList me={me} users={users}/>
                </div>
                <Messages chat={chat} me={me}/>
            </div>
        </Context.Provider>
    )
}
