import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import MainContext from '../../context/MainContext';
import Advertiser from '../../components/advertise/Advertise';

function Advertises() {
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  // const [refresh, setRefresh] = useState(false);
  const { data, setData, refresh, setLoading, setMessage } = useContext(MainContext);

  useEffect(() => {
    let url = 'http://localhost:8000/api/adv/';

    if(sort != '' && direction != '') {
      url += sort + '/' + direction + '/';
    }

    setMessage(false);
    setLoading(true);

    axios.get(url)
    .then(resp => {
      setData(resp.data)
    })
    .finally(() => setLoading(false));
  }, [refresh, sort, direction]);

  return (
    <>  
        <div className="d-flex justify-content-between align-items-center pb-4">
          <h1>Newest addvertises</h1>
          <div className="sort d-flex gap-3">
            <select 
              className="form-control"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <select 
              className="form-control"
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="">Sort as</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="row">
          {data.map(adv => 
            <Advertiser key={adv.id} data={adv} />
          )}
        </div>
    </>
  );
}

export default Advertises;