import React, { useEffect, useState } from 'react';
import '../Product/Product.scss';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function VenteCenter() {
    const [product, setProduct] = useState('');
    const [token, setToken] = useState('');
    const [center, setCenter] = useState('');
    const [searchFilters, setSearchFilters] = useState({
        dateVc: '',
        codeCc: '',
        codeCp: ''
    });
    const [values, setValues] = useState({
        dateVc: '',
        codeCc: '',
        codeCp: '',
        qteCenter: '',
        payed: ''
    });
    const [data, setData] = useState([]);
    const [client, setClient] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [bool, setBool] = useState(true);

    const fetchingData = async () => {
        console.log(token);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/ventCenter', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (response.status >= 200 && response.status < 300) {
                setData(response.data.reverse());
            }
            const responseClient = await axios.get('http://localhost:8080/api/v1/centerClient');
            if (responseClient.status >= 200 && responseClient.status < 300) {
                setClient(responseClient.data);
            }
            const responseProduct = await axios.get('http://localhost:8080/api/v1/centerProduct');
            if (responseProduct.status >= 200 && responseProduct.status < 300) {
                setProductInfo(responseProduct.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setCenter(localStorage.getItem('center'));
        fetchingData();
    }, [data, token, center]);

    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const changeHandler = (e) => {
        setProduct(e.target.value);
        setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/v1/ventCenter', {
            dateVc: values.dateVc,
            codeCc: values.codeCc,
            codeCp: values.codeCp,
            qteCenter: Number.parseInt(values.qteCenter),
            payed: Number.parseInt(values.payed),
            codeCt: center
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res);
                setValues({
                    dateVc: '',
                    codeCc: '',
                    codeCp: '',
                    qteCenter: '',
                    payed: ''
                });
                toast.success('Done');
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            });
    };

    const deleteHandler = async ({ dateVc, codeCc, codeCp }) => {
        await axios.delete(`http://localhost:8080/api/v1/ventCenter/${dateVc}/${codeCc}/${codeCp}/${center}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log(res);
                toast.success('Done');
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.error);
            });
    };

    const updateHandler = async ({ date, codeClient, codePro }) => {
        setValues({
            dateVc: date,
            codeCc: codeClient,
            codeCp: codePro,
            qteCenter: '',
            payed: ''
        });
        setBool(false);
    };

    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input
                    type="date"
                    name='dateVc'
                    placeholder='Search by DateVc'
                    value={searchFilters.dateVc}
                    onChange={(e) => changeHandler(e)}
                />
                <input
                    type="text"
                    name='codeCc'
                    placeholder='Search by CodeCc'
                    value={searchFilters.codeCc}
                    onChange={(e) => changeHandler(e)}
                />
                <input
                    type="text"
                    name='codeCp'
                    placeholder='Search by CodeCp'
                    value={searchFilters.codeCp}
                    onChange={(e) => changeHandler(e)}
                />
                <button onClick={() => console.log('Implement your search logic here')}>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => submitHandler(e)}>
                <h1>Add A Vente </h1>
                <input
                    type="date"
                    placeholder='Date'
                    name='dateVc'
                    value={values.dateVc}
                    onChange={(e) => createHandler(e)}
                />
                <input
                    type="text"
                    placeholder='quantite'
                    name='qteCenter'
                    value={values.qteCenter}
                    onChange={(e) => createHandler(e)}
                />
                <input
                    type="text"
                    placeholder='payed'
                    name='payed'
                    value={values.payed}
                    onChange={(e) => createHandler(e)}
                />
                <input
                    list="fournisseurOption"
                    placeholder="Select a client"
                    name="codeCc"
                    value={values.codeCc}
                    onChange={(e) => createHandler(e)}
                />
                <datalist id="fournisseurOption">
                    {client.map((elem) => (
                        <option key={elem.codeCc} value={elem.codeCc} />
                    ))}
                </datalist>
                <p>Want to create a client ? <a href="http://localhost:5173/client" target="_blank"> Create one</a></p>
                <input
                    list="productOption"
                    placeholder="Select a product"
                    name="codeCp"
                    value={values.codeCp}
                    onChange={(e) => createHandler(e)}
                />
                <datalist id="productOption">
                    {productInfo.map((elem) => (
                        <option key={elem.codeCp} value={elem.codeCp} />
                    ))}
                </datalist>
                <p>Want to create a product ? <a href="http://localhost:5173/products" target="_blank"> Create One</a></p>
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {data.map((elem) => (
                    <div className='oneProduct' key={elem.dateVc + elem.codeCc + elem.codeCp}>
                        <div>
                            <h3>date : {elem.dateVc.split('T')[0]}</h3>
                            <h3>quantity : {elem.qteCenter}</h3>
                            <h3>total price : {elem.totalPrice}</h3>
                            <h3>payed : {elem.payed}</h3>
                            <h3>codeCc : <a href={`http://localhost:5173/client/#${elem.codeCc}`}>{elem.codeCc}</a> </h3>
                            <h3>codeCp : <a href={`http://localhost:5173/products/#${elem.codeCp}`}>{elem.codeCp}</a> </h3>
                        </div>
                        <div className="btns">
                            <button onClick={() => updateHandler({ date: elem.dateVc, codeClient: elem.codeCc, codePro: elem.codeCp })}>Update</button>
                            <button className='delete' onClick={() => deleteHandler({ dateVc: elem.dateVc, codeCc: elem.codeCc, codeCp: elem.codeCp })}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {!bool && <div className='shadow' onClick={() => setBool(!bool)}></div>}
            <Toaster position="bottom-left" reverseOrder={false} />
        </div>
    );
}

export default VenteCenter;
