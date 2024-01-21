import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Main.scss'
import NavBar from '../../componants/NavBar/NavBar'
import SideBar from '../../componants/SideBar/SideBar'
import CenterProduct from '../Product/CenterProduct'
import VenteCenter from '../Vent/VenteCenter'
import Employee from '../Employee/Employee'
import CenterClient from '../Client/CenterClient'


function Main() {

  return (
    <div className='app__main'>
      <NavBar/>
      <SideBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/center/products' element={<CenterProduct />} />
          <Route path='/center/vente' element={<VenteCenter />} />
          <Route path='/center/employee' element={<Employee />} />
          <Route path='/center/client' element={<CenterClient />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
