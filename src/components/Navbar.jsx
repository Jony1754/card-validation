import React from 'react';
import '../scss/navbar.scss';
import logo from '../assets/logo.svg';
const Navbar = () => {
  return (
    <nav>
      <div className='navbar'>
        <div className='navbar__logo'>
          <img src={logo} alt='' />
        </div>

        <div className='navbar__search'>
          <input type='text' placeholder='Search' />
        </div>

        <div className='navbar__user'>
          <div className='navbar__user__avatar'>
            <img src='https://i.pravatar.cc/150?img=1' alt='avatar' />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
