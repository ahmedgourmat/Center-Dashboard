import React from 'react'
import './NavBar.scss'

function NavBar() {

  return (
    <div className='app__navBar'>
      <h1>Dash Board</h1>
      <a href='http://localhost:5174' onClick={()=>{localStorage.removeItem('token'); localStorage.removeItem('center');}}>LOGOUT</a>
    </div>
  )
}

export default NavBar
