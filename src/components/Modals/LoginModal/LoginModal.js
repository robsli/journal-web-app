import React from 'react'
import Modal from 'react-modal'
import './LoginModal.css'

function LoginModal({
  closeModal,
  handleChange,
  login,
  modalIsOpen,
  password,
  username
}) {
  return (
    <Modal
      className='login-modal'
      contentLabel='Login Modal'
      isOpen={ modalIsOpen }
      onRequestClose={ closeModal }
      overlayClassName='modal-overlay'
    >
      <h1>Welcome Back!</h1>
      <div className='input-group'>
        <i className='fa fa-user'></i>
        <input
          onChange={ handleChange }
          name='username'
          placeholder='Username'
          type='text'
        />
      </div>
      <div className='input-group'>
        <i className='fa fa-lock'></i>
        <input
          onChange={ handleChange }
          name='password'
          placeholder='Password'
          type='password'
        />
      </div>
      <div className='login-modal-actions'>
        <button className='login' onClick={() => login(username, password)}>Log In</button>
        <button className='cancel' onClick={() => closeModal()}>Cancel</button>
      </div>
    </Modal>
  )
}

export default LoginModal
