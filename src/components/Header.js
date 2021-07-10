import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Header(props) {
    const handlerClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    let token = localStorage.getItem('token');

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="container collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {token ?
                        <>
                            <li className="nav-item">
                                <span className="nav-link" style={{cursor: 'pointer'}}
                                      onClick={handlerClick}>logout</span>
                            </li>
                        </> :
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/registration">Registration</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    </nav>;
};