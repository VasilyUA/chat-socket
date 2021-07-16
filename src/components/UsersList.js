import React, {useContext} from 'react';
import {Context} from '../my-hook/context';

export default function UsersList({users, me}) {
    const {handlerClick} = useContext(Context);
    return <>
        <b>Онлайн: {users.length}</b>
        <ul>
            {Boolean(users.length) ? users.map((item, index) => (
                <li key={`${item._id}_${index}`} className="user-list"
                    onClick={() => handlerClick(me._id, item._id)}>
                    <span>{item.email}</span>
                    <span className='message-count'>1</span>
                </li>)) : null}
        </ul>
    </>;
};