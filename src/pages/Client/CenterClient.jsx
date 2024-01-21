import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function CenterClient() {
    const [token, setToken] = useState('');
    const [codeCt, setCodeCt] = useState('');

    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [prenomSearch, setPrenomSearch] = useState('');
    const [values, setValues] = useState({
        codeCc: '',
        nameCc: '',
        prenomCc: '',
        adrCc: '',
        telCc: ''
    });
    const [data, setData] = useState([]);
    const [bool, setBool] = useState(true);
    const [id, setId] = useState('');

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/centerClient', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setCodeCt(localStorage.getItem('center'));
        fetchingData();
    }, [token, codeCt, data]);

    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const changeHandler = (e) => {
        setCodeSearch('');
        setNameSearch('');
        setPrenomSearch('');
        setProduct('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/centerClient', {
                codeCc: values.codeCc,
                nameCc: values.nameCc,
                prenomCc: values.prenomCc,
                adrCc: values.adrCc,
                telCc: values.telCc,
                codeCt
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setValues({
                    codeCc: '',
                    nameCc: '',
                    prenomCc: '',
                    adrCc: '',
                    telCc: ''
                });
                toast.success('Done');
                // Refetch data after successful addition
                fetchingData();
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    const deleteHandler = async (codeCc) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/centerClient/${codeCc}/${codeCt}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            // Refetch data after successful deletion
            fetchingData();
            toast.success('Done');
        } catch (err) {
            toast.error('There is an error');
            console.log(err);
        }
    };

    const updateHandler = async (codeCc) => {
        setId(codeCc);
        setBool(false);
    };

    const filterClients = (clients, code, name, prenom) => {
        return clients.filter((client) => {
            const codeMatches = code ? client.codeCc.toLowerCase().includes(code.toLowerCase()) : true;
            const nameMatches = name ? client.nameCc.toLowerCase().includes(name.toLowerCase()) : true;
            const prenomMatches = prenom ? client.prenomCc.toLowerCase().includes(prenom.toLowerCase()) : true;

            return codeMatches && nameMatches && prenomMatches;
        });
    };

    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input
                    type="text"
                    name='codeSearch'
                    placeholder='Search by Code'
                    value={codeSearch}
                    onChange={(e) => { setCodeSearch(e.target.value) }}
                />
                <input
                    type="text"
                    name='nameSearch'
                    placeholder='Search by Name'
                    value={nameSearch}
                    onChange={(e) => { setNameSearch(e.target.value) }}
                />
                <input
                    type="text"
                    name='prenomSearch'
                    placeholder='Search by Prenom'
                    value={prenomSearch}
                    onChange={(e) => { setPrenomSearch(e.target.value) }}
                />
                <button disabled>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Client</h1>
                <input type="text" placeholder='CodeCl(must be unique)' name='codeCc' value={values.codeCc} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='nom' name='nameCc' value={values.nameCc} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='prenom' name='prenomCc' value={values.prenomCc} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='adresse' name='adrCc' value={values.adrCc} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='telephone' name='telCc' value={values.telCc} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {filterClients(data, codeSearch, nameSearch, prenomSearch).map((elem) => (
                    <div className='oneProduct' key={elem.codeCc}>
                        <div>
                            <h3>CodeCl : {elem.codeCc}</h3>
                            <h3>nameCc : {elem.nameCc}</h3>
                            <h3>prenomCc : {elem.prenomCc}</h3>
                            <h3>adrCc : {elem.adrCc}</h3>
                            <h3>telCc : {elem.telCc}</h3>
                            <h3>credit : {elem.credit}</h3>
                        </div>
                        <div className="btns">
                            <button onClick={() => { updateHandler(elem.codeCc) }}>Update</button>
                            <button className='delete' onClick={() => { deleteHandler(elem.codeCc) }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {!bool && <div className='shadow' onClick={() => { setBool(!bool) }}></div>}
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </div>
    );
}

export default CenterClient;
