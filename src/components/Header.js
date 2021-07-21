import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
	const handlerClick = () => {
		sessionStorage.removeItem('token');
		window.location.href = '/login';
	};
	let token = sessionStorage.getItem('token');

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor01'
					aria-controls='navbarColor01'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='container collapse navbar-collapse' id='navbarColor01'>
					<ul className='navbar-nav mb-2 mb-lg-0'>
						{token ? (
							<>
								<li className='nav-item'>
									<span className='nav-link' style={{ cursor: 'pointer' }} onClick={handlerClick}>
										logout
									</span>
								</li>
							</>
						) : (
							<>
								<li className='my-nav-item'>
									<NavLink exact activeStyle={{ fontWeight: 'bold', color: '#0c9f0cd6' }} to='/'>
										Registration
									</NavLink>
								</li>
								<li className='my-nav-item'>
									<NavLink exact activeStyle={{ fontWeight: 'bold', color: '#0c9f0cd6' }} to='/login'>
										Login
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
