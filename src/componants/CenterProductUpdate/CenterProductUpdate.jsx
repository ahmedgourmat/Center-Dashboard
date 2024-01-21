import React, { useEffect, useState } from 'react'
import './CenterProductUpdate.scss'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

function CenterProductUpdate({ bool, setBool, codeCp }) {
    const [codeCt , setCodeCt] = useState('')
    const [token , setToken] = useState('')
    const [values, setValues] = useState({
        name : '',
        designP: '',
        quantite: '', 
        price : ''
    })

    const changeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        console.log('here')
        console.log(token)
        console.log(codeCp)
        e.preventDefault()
    
        // Fix the object property here
        await axios.patch(`http://localhost:8080/api/v1/centerProduct/${codeCp}/${codeCt}`, {
            designCp: values.designCp,
            name: values.name, // Added the missing property
            quantite: Number.parseInt(values.quantite),
            price: Number.parseInt(values.price)
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res)
                setBool(true)
                setValues({
                    name: '',
                    price: '',
                    designCp: '',
                    quantite: ''
                })
                toast.success('Done')
            })
            .catch((err) => {
                toast.error(err.response.data.error)
            })
    }

    useEffect(()=>{
        setCodeCt(localStorage.getItem('center'))
        setToken(localStorage.getItem('token'))
        console.log(token)
        console.log(codeCt)
    },[codeCt , token])


    return (
        <form onSubmit={(e) => { submitHandler(e) }} className={`app__productUpdate ${bool && 'visibility'}`}>
            <input type="text" name='name' placeholder='name' value={values.name} onChange={(e) => { changeHandler(e) }} />
            <input type="text" name='designCp' placeholder='designCp' value={values.designCp} onChange={(e) => { changeHandler(e) }} />
            <input type="text" name='quantite' placeholder='quantite' value={values.quantite} onChange={(e) => { changeHandler(e) }} />
            <input type="text" name='price' placeholder='price' value={values.price} onChange={(e) => { changeHandler(e) }} />
            <button>Done</button>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </form>
    )
}

export default CenterProductUpdate
