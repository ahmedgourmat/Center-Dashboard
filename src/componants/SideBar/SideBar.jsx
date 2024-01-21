import React from 'react'
import './SideBar.scss'

function SideBar() {
    return(
        <div className='app__sideBar'>
            <a href="http://localhost:5174/center/products">Center Product</a>
            <a href="http://localhost:5174/center/vente">Vent</a>
            <a href="http://localhost:5174/center/employee">Employee</a>
            <a href="http://localhost:5174/center/client">Client</a>
        </div>
    )
}

export default SideBar
