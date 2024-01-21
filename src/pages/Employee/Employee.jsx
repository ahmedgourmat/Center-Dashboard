import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import EmployeeUpdate from '../../componants/EmployeeUpdate/EmployeeUpdate';
import { toast, Toaster } from 'react-hot-toast';

function Employee() {
  const [searchCode, setSearchCode] = useState('');
  const [searchNom, setSearchNom] = useState('');
  const [searchPrenom, setSearchPrenom] = useState('');
  const [token, setToken] = useState('');
  const [center, setCenter] = useState('');
  const [values, setValues] = useState({
    codeE: '',
    nomE: '',
    prenomE: '',
    adrE: '',
    telE: '',
    salaire: '',
  });
  const [data, setData] = useState([]);
  const [bool, setBool] = useState(true);
  const [id, setId] = useState('');

  const fetchingData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/employee', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const filteredData = response.data
          .filter((elem) => (searchCode === '' || elem.codeE.toLowerCase().includes(searchCode.toLowerCase()))
            && (searchNom === '' || elem.nomE.toLowerCase().includes(searchNom.toLowerCase()))
            && (searchPrenom === '' || elem.prenomE.toLowerCase().includes(searchPrenom.toLowerCase()))
          );
        setData(filteredData.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setCenter(localStorage.getItem('center'));
    fetchingData();
  }, [data, token, center, searchCode, searchNom, searchPrenom]);

  const createHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/v1/employee', { ...values, codeCt: center }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        console.log(res);
        setValues({
          codeE: '',
          nomE: '',
          prenomE: '',
          adrE: '',
          telE: '',
          salaire: '',
          codeCt: '',
        });
        toast.success('Done');
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const deleteHandler = async (codeE) => {
    await axios.delete(`http://localhost:8080/api/v1/employee/${codeE}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHandler = async (codeE) => {
    setId(codeE);
    setBool(false);
  };

  return (
    <div className='app__product'>
      <div className='app__product-search'>
        <input type="text" placeholder='Search by CodeE' value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
        <input type="text" placeholder='Search by Nom' value={searchNom} onChange={(e) => setSearchNom(e.target.value)} />
        <input type="text" placeholder='Search by Prenom' value={searchPrenom} onChange={(e) => setSearchPrenom(e.target.value)} />
        <button>Search</button>
      </div>
      <form className='app__product-add' onSubmit={(e) => { submitHandler(e); }}>
        <h1>Add An Employee</h1>
        <input type="text" placeholder='CodeE(must be unique)' name='codeE' value={values.codeE} onChange={(e) => { createHandler(e) }} />
        <input type="text" placeholder='nom' name='nomE' value={values.nomE} onChange={(e) => { createHandler(e) }} />
        <input type="text" placeholder='prenom' name='prenomE' value={values.prenomE} onChange={(e) => { createHandler(e) }} />
        <input type="text" placeholder='adresse' name='adrE' value={values.adrE} onChange={(e) => { createHandler(e) }} />
        <input type="text" placeholder='telephone' name='telE' value={values.telE} onChange={(e) => { createHandler(e) }} />
        <input type="text" placeholder='salaire' name='salaire' value={values.salaire} onChange={(e) => { createHandler(e) }} />
        <button>ADD</button>
      </form>
      <div className="app__product-products">
        {
          data.map((elem) => (
            <div className='oneProduct' key={elem.codeE}>
              <div>
                <h3>CodeF : {elem.codeE}</h3>
                <h3>nomE : {elem.nomE}</h3>
                <h3>prenomE : {elem.prenomE}</h3>
                <h3>adrE : {elem.adrE}</h3>
                <h3>telE : {elem.telE}</h3>
                <h3>massrouf : {elem.massrouf}</h3>
                <h3>salaire : {elem.salaire}</h3>
              </div>
              <div className="btns">
                <button onClick={() => { updateHandler(elem.codeE) }}>Update</button>
                <button className='delete' onClick={() => { deleteHandler(elem.codeE) }}>Delete</button>
              </div>
            </div>
          ))
        }
        <EmployeeUpdate bool={bool} codeE={id} setBool={setBool} />
      </div>
      {
        !bool && <div className='shadow' onClick={() => { setBool(!bool); }}></div>
      }
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
    </div>
  );
}

export default Employee;
