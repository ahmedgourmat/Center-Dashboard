import React, { useEffect, useState } from 'react'
import '../CenterProductUpdate/CenterProductUpdate.scss'
import axios from 'axios'
import {toast , Toaster} from 'react-hot-toast'


function EmployeeUpdate({bool , setBool , codeE}) {
    const [token , setToken] = useState('')
    const [values , setValues] = useState({
        codeE : '',
        nomE : '',
        prenomE : '',
        adrE : '',
        telE : '',
        salaire : '',
        massrouf : ''
    })

    const changeHandler = (e)=>{
        setValues({...values , [e.target.name] : e.target.value})
    }
    
    const submitHandler = async(e)=>{
        e.preventDefault()
        await axios.patch(`http://localhost:8080/api/v1/employee/${codeE}`,{nomE : values.nomE,prenomE : values.prenomE,adrE : values.adrE,telE : values.telE , salaire : Number.parseInt(values.salaire),massrouf : Number.parseInt(values.massrouf)},{
            headers : {
                'Authorization' : 'Barear ' + token
            }
        })
        .then((res)=>{
            console.log(res)
            setBool(true)
            setValues({
                designP : '',
                qteStock : ''
            })
            toast.success('Done')
        })
        .catch((err)=>{
            toast.error(err.response.data.error)
        })
    }

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[token])


  return (
    <form onSubmit={(e)=>{submitHandler(e)}} className={`app__productUpdate ${bool && 'visibility'}`}>
        <input type="text" placeholder='nom' name='nomE' value={values.nomE} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='prenom' name='prenomE' value={values.prenomE} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='adresse' name='adrE' value={values.adrE} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='telephone' name='telE' value={values.telE} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='salaire' name='salaire' value={values.salaire} onChange={(e)=>{changeHandler(e)}} />
        <input type="text" placeholder='massrouf' name='massrouf' value={values.massrouf} onChange={(e)=>{changeHandler(e)}} />
      <button>Done</button>
      <Toaster
            position="bottom-left"
            reverseOrder={false}
        />
    </form>
  )
}

export default EmployeeUpdate
