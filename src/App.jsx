import { useEffect , useState } from 'react'
import './App.css'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Main from './pages/Main/Main'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  const [token , setToken] = useState('')

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[token])

  return (
    <div className={!token && `app`}>
      <BrowserRouter>
        <Routes>
          {!token && <Route path='/' element={<Login/>} /> }
          {!token && <Route path='/signup' element={<Signup/>} /> } 
        </Routes>
      </BrowserRouter>
      {token && <Main/>}
    </div>
  )
}

export default App