import React, {useEffect, useState} from 'react'
import socket from "../socket";

export default function Chat() {
    const [me, setMe] = useState({email: ""});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        socket.emit('join', data => { setMe(data); });
        socket.on('get_online_users', users => {
            setUsers(users);
        })
    }, []);  // eslint-disable-line

    return (
        <div className="chat" style={{marginTop: '40px'}}>
            <div className="chat-users">
                Акаунт: <b>{me._id}</b>
                <br/>
                Логін: <b>{me.email}</b>
                <hr/>
                <b>Онлайн {users.length}:</b>
                <ul>
                    {users.length ? users.map(item => (<li key={item._id}>{item.email}</li>)) : <li>User not found</li>}
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    <div className="message">
                        <p>messages</p>
                        <div>
                            <span>user name</span>
                        </div>
                    </div>
                </div>
                <form>
            <textarea
                className="form-control"
                rows="3"/>
                    <button type="button" className="btn btn-primary">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}
