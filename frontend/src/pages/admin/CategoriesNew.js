import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';

function NewCategory() {
    const { setLoading, setMessage } = useContext(MainContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);


        setLoading(true);
        axios.post('http://localhost:8000/api/cat', data)
        .then(resp => {
            setMessage({m: resp.data, s: 'success'});
            setTimeout(() => navigate('/admin/categories'), 2000);
        })
        .catch(error => {
            setMessage({m: error.response.data, s: 'danger'})
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            <h1>New category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" required />
                </div>
                <button className="btn btn-primary">Save</button>
            </form>
        </>
    );
}

export default NewCategory;

