import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) =>(
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'/>
        </Link>

        <div className='options'>
            <Link to='/shop' className='option'> SHOP </Link>
            <Link to='/shop' className='option'> CONTACT </Link>
            
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}> Sign Out </div>
                :
                <Link className='option' to='/signin'></Link>
            }
        </div>
    </div>
);

export default Header;