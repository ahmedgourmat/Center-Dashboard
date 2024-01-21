import axios from 'axios'
import React,  {useState} from 'react'
import './Auth.scss'
import { useNavigate } from 'react-router-dom'
import {toast , Toaster} from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()

    const [info , setInfo] = useState({
        codeCt : '' ,
        password : '',
        confirmPassword :''
    })

    const changeHandler = (e)=>{
        setInfo({...info , [e.target.name] : e.target.value})
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:8080/api/v1/center/signup' , {codeCt : info.codeCt , password : info.password , confirmPassword : info.confirmPassword})
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('token' , res.data.token)
            localStorage.setItem('center' , res.data.center)
            setInfo({
                codeCt : '' ,
                password : '',
                confirmPassword :''
            })
            toast.success('Done')
            navigate('/center/products')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })

    }


    return (
        <form className="form" onSubmit={(e)=>{submitHandler(e)}}>
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
                <input type="text" name='codeCt' placeholder="Enter codeCt" value={info.codeCt} onChange={(e) => { changeHandler(e) }} />
                <span>
                </span>
            </div>
            <div className="input-container">
                <input type="password" name='password' placeholder="Enter password" value={info.password} onChange={(e) => { changeHandler(e) }}/>
                <span>
                </span>
            </div>
            <div className="input-container">
                <input type="password" name='confirmPassword' placeholder="Enter confirmPassword" value={info.confirmPassword} onChange={(e) => { changeHandler(e) }}/>
            </div>
            <button type="submit" className="submit">
                Sign in
            </button>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </form>
    )
}

export default Login
