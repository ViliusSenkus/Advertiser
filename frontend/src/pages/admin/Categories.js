import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../../context/MainContext';
import AdminTableButtons from '../../components/adminTableButtons/AdminTableButtons';

function Categories() {
    const { setLoading, refresh, setMessage, setRefresh } = useContext(MainContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:8000/api/cat')
            .then(resp => {
                setData(resp.data);
            })
            .finally(() => setLoading(false));
    }, [refresh]);

    const handleDelete = (id) => {
        setLoading(true);

        axios.delete('http://localhost:8000/api/cat/' + id)
            .then(resp => {
                setMessage({ m: resp.data, s: 'success' });
                setRefresh(!refresh);
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Categories List</h1>
                <Link to="/admin/new-category" className="btn btn-primary">New</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <AdminTableButtons 
                                    id={item.id} 
                                    link="category" 
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

export default Categories;
