import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';

function NewAdv() {
    const [data, setData] = useState([]);
    const { setLoading, setMessage } = useContext(MainContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/cat')
        .then(resp => setData(resp.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        setLoading(true);
        axios.post('http://localhost:8000/api/adv', data)
        .then(resp => {
            setMessage({m: resp.data, s: 'success'});
            setTimeout(() => navigate('/admin'), 2000);
        })
        .catch(error => {
            setMessage({m: error.response.data, s: 'danger'})
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            <h1>New Advertisment</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>item name</label>
                    <input type="text" name="name" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea name="description" className="form-control" required ></textarea>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" name="price" step="0.01" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>Photo</label>
                    <input type="text" name="photo" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label>City</label>
                    <input type="text" name="city" className="form-control" required />
                </div>
                
                <div className="mb-3">
                    <div>Choose Category:</div>
                    {data.map(item => 
                        <div key={item.id}>
                            <label>
                                <input type="checkbox" name="categories[]" className="form-check-input me-2" value={item.id} />
                                {item.name}
                            </label>
                        </div>    
                    )}
                </div>
                <button className="btn btn-primary">Announce</button>
            </form>
        </>
    );
}

export default NewAdv;