import React, {useState, useEffect} from "react";
import axios from "axios";
import _ from "lodash";
import {useHistory} from 'react-router-dom';

export default function Form({title = 'Login'}) {
    const [state, setState] = useState({email: '', password: ''});
    const [err, setErr] = useState(false);
    const history = useHistory();

    useEffect(()=> {
        if (localStorage.getItem('token')) history.push('/chat-list');
    })

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:3001/${title.toLowerCase()}`, state);
            localStorage.setItem('token', _.get(result, 'data.token'));
           window.location.href = '/chat-list';
        } catch (err) {
            setErr(JSON.stringify(err, null, 5));
        }
    }

    return (
        <form className="join-block" style={{marginTop: '200px', width: '400px', textAlign: 'center'}}
              onSubmit={onSubmit}>
            {err ? <p>{err}</p> : null}
            <h1>{title} form!</h1>
            <input type="text" placeholder="email" value={state.email}
                   onChange={e => setState({...state, email: e.target.value})}/>
            <input type="password" placeholder="password" value={state.password}
                   onChange={e => setState({...state, password: e.target.value})}/>
            <button className="btn btn-success">"{title}..."</button>
        </form>
    );
}
