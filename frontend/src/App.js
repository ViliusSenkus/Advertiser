import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//React router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layoutas
import MainLayout from './layouts/MainLayout';

//Kontekstas
import MainContext from './context/MainContext';

//Puslapiai
import Advertises from './pages/client/Advertises'
import Category from './pages/client/Category';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import AdminAdv from './pages/admin/Adv';
import NewAdv from './pages/admin/NewAdv';
import EditAdv from './pages/admin/editAdv';
import Categories from './pages/admin/Categories';
import NewCategory from './pages/admin/CategoriesNew';
import EditCategory from './pages/admin/CategoriesEdit';
// import Orders from './pages/admin/Orders';

function App() {

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [user, setUser] = useState(false);

  const contextValues = { 
    data, 
    setData, 
    refresh, 
    setRefresh,
    loading,
    setLoading,
    message,
    setMessage,
    user,
    setUser
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!token) return;

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
    axios.get('http://localhost:8000/api/check')
    .then(resp => setUser(true));
  }, []);

  return (
    <>
      <BrowserRouter>
        <MainContext.Provider value={contextValues}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Advertises />} />
              <Route path="/category/:id" element={<Category />} />
              
              <Route path= "admin/" element={<AdminAdv />} />
              <Route path="admin/newadv/" element={<NewAdv />} />
              <Route path="admin/editAdv/:id" element={<EditAdv />} />
              <Route path="admin/categories" element={<Categories />} />
              <Route path="admin/new-category" element={<NewCategory />} />
              <Route path="admin/editcategory/:id" element={<EditCategory />} />
              {user ?
                <Route path="/admin">
                  {/* <Route index element={<Advertises />} />
                  
                  
                  
                  
                  */}
                </Route>
              :
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              }

              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </MainContext.Provider>
      </BrowserRouter>
    </>
    // <Products />
  );
}

export default App;
