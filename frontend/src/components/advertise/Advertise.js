import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Advertise({ data }) {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        return navigate('/' + data.id + '/' + qty);
    }

    return (
        <div className="col-4" key={data.id}>
            <img 
                src={data.photo} 
                alt={data.name}
            />
            <h4>{data.name}</h4>
            <div>{data.description}</div>
            <h5>€ {data.price}</h5>

            {
            /* Perdaryti i isiminima ir komentara.
            
             <form 
                className="py-2 input-group mb-4"
                onSubmit={handleSubmit}
            >
                <input 
                    type="number" 
                    value={qty} 
                    className="form-control" 
                    onChange={(e) => setQty(e.target.value)}
                />
                <button className="btn btn-primary">Užsakyti</button>
            </form> */}
        </div>
    );
}

export default Advertise;
