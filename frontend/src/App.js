import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


import { BrowserRouter, Routes, Route } from 'react-router-dom';


import MainLayout from './layouts/MainLayout';


import MainContext from './context/MainContext';


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
              
              {user ?
                <Route path="/admin">
                  <Route index element={<AdminAdv />} />
                  <Route path="newadv/" element={<NewAdv />} />
                  <Route path="editAdv/:id" element={<EditAdv />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="new-category" element={<NewCategory />} />
                  <Route path="editcategory/:id" element={<EditCategory />} />
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
  );
}

export default App;
