import React from 'react';

export default function MyProfile({me}) {
    return <>
        Акаунт: <b>{me._id}</b>
        <br/>
        Логін: <b>{me.email}</b>
        <hr/>
    </>;
};