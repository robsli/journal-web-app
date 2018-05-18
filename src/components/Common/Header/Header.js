import React from 'react';
import './Header.css';

function Header({
  handleChange,
  isAuthenticated,
  logout,
  openModal,
  username
}) {
  return (
    <div className='header-wrapper'>
      <div className='header'>
        <h1>Journal App</h1>
        { !isAuthenticated ?
          <div className='header-actions'>
            <button onClick={ () => openModal() }>Log In</button>
            <button onClick={ () => console.log('signing up') }>Sign Up</button>
          </div>
          :
          <span>{ username }
            <button className='logout' onClick={ () => logout() }>logout</button>
          </span>
        }
      </div>
    </div>
  )
}

export default Header
