import React, { useEffect, useState } from 'react';
import './Product.scss';
import axios from 'axios';
import ProductUpdate from '../../../../Client/src/components/ProductUpdate/ProductUpdate';
import { toast, Toaster } from 'react-hot-toast';
import CenterProductUpdate from '../../componants/CenterProductUpdate/CenterProductUpdate';

function CenterProduct() {
    const [token, setToken] = useState('');
    const [center, setCenter] = useState('');
    const [values, setValues] = useState({
        codeCp: '',
        name: '',
        quantite: '',
        designCp: '',
        price: ''
    });
    const [data, setData] = useState([]);
    const [bool, setBool] = useState(true);
    const [id, setId] = useState('');

    const [searchFilters, setSearchFilters] = useState({
        productName: '',
        codeCp: ''
    });

    const fetchingData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/centerProduct', {
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
        setCenter(localStorage.getItem('center'));
        fetchingData();
    }, [token, center, data]);

    const createHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/centerProduct', {
                codeCp: values.codeCp,
                name: values.name,
                designCp: values.designCp,
                price: Number.parseInt(values.price),
                quantite: Number.parseInt(values.quantite),
                codeCt: center
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (response.status >= 200 && response.status < 300) {
                setValues({
                    codeCp: '',
                    name: '',
                    designCp: '',
                    price: '',
                    quantite: ''
                });
                toast.success('Done');
                // Refetch data after successful addition
                fetchingData();
            }
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    const deleteHandler = async (codeCp) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/centerProduct/${codeCp}/${center}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            // Refetch data after successful deletion
            fetchingData();
        } catch (err) {
            toast.error(err.response.data.error);
        }
    };

    const updateHandler = async (codeCp) => {
        setId(codeCp);
        setBool(false);
    };

    const filterProducts = (products, searchFilters) => {
        return products.filter((product) => {
            const productNameMatch = product.name.toLowerCase().startsWith(searchFilters.productName.toLowerCase());
            const codeCpMatch = product.codeCp.toLowerCase().startsWith(searchFilters.codeCp.toLowerCase());
            return productNameMatch || codeCpMatch;
        });
    };

    return (
        <div className='app__product'>
            <div className='app__product-search'>
                <input
                    type="text"
                    name='productName'
                    placeholder='Search By Name'
                    value={searchFilters.productName}
                    onChange={(e) => { createHandler(e) }}
                />
                <input
                    type="text"
                    name='codeCp'
                    placeholder='Search By CodeCp'
                    value={searchFilters.codeCp}
                    onChange={(e) => { createHandler(e) }}
                />
                <button onClick={(e) => { submitHandler(e) }}>Search</button>
            </div>
            <form className='app__product-add' onSubmit={(e) => { submitHandler(e) }}>
                <h1>Add A Center Product</h1>
                <input type="text" placeholder='CodeCp(must be unique)' name='codeCp' value={values.codeCp} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='name' name='name' value={values.name} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='designCp' name='designCp' value={values.designCp} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='price' name='price' value={values.price} onChange={(e) => { createHandler(e) }} />
                <input type="text" placeholder='quantite' name='quantite' value={values.quantite} onChange={(e) => { createHandler(e) }} />
                <button>ADD</button>
            </form>
            <div className="app__product-products">
                {filterProducts(data, searchFilters).map((elem) => (
                    <div className='oneProduct' id={elem.codeCp} key={elem.codecP}>
                        <div>
                            <h3>CodeCp : {elem.codeCp}</h3>
                            <h3>name : {elem.name}</h3>
                            <h3>designCp : {elem.designCp}</h3>
                            <h3>quantity : {elem.quantite}</h3>
                            <h3>price : {elem.price} DA</h3>
                            <h3>center : {elem.codeCt}</h3>
                        </div>
                        <div className="btns">
                            <button onClick={() => { updateHandler(elem.codeCp) }}>Update</button>
                            <button className='delete' onClick={() => { deleteHandler(elem.codeCp) }}>Delete</button>
                        </div>
                    </div>
                ))}
                <CenterProductUpdate bool={bool} codeCp={id} setBool={setBool} />
            </div>
            {!bool && <div className='shadow' onClick={() => { setBool(!bool) }}></div>}
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </div>
    );
}

export default CenterProduct;
