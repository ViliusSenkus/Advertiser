import { Link } from 'react-router-dom';

function AdminTableButtons({ id, deleteFn, link }) {
    return (
        <div className="d-flex gap-3 justify-content-end">
            <Link
                to={'/admin/edit' + link + '/' + id}
                className="btn btn-primary"
            >Edit</Link>
            <button
                className="btn btn-danger"
                onClick={() => deleteFn(id)}
            >Delete</button>
        </div>
    );
}

export default AdminTableButtons;
