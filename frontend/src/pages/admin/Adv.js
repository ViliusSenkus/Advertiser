import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';
import AdminTableButtons from '../../components/adminTableButtons/AdminTableButtons';

function Adv() {
    const { setLoading, refresh, setMessage, setRefresh } = useContext(MainContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
       
        axios.get('http://localhost:8000/api/adv/')
            .then(resp => {
                setData(resp.data);
            })
            .finally(() => setLoading(false));
    }, [refresh]);

    const handleDelete = (id) => {
        setLoading(true);

        axios.delete('http://localhost:8000/api/adv/' + id)
            .then(resp => {
                setMessage({ m: resp.data, s: 'success' });
                setRefresh(!refresh);
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Advertisers list</h1>
                <Link to="/admin/newadv/" className="btn btn-primary">New entry</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>City</th>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>{item.city}</td>
                            {/* <td>{item.categories.map(cat => cat.name).join(', ')}</td> */}
                            <td>
                                <AdminTableButtons 
                                    id={item.id} 
                                    link="Adv" 
                                    deleteFn={handleDelete} 
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Adv;