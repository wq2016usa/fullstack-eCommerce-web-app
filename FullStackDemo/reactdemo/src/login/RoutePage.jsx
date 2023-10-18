import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ECommerceHome from './ECommerceHome';
import AdminMgtHome from './AdminMgtHome';

const RoutePage = () => {
  return (
    <div>
      <div>

            <Routes>
                {/* <Route path="/">
                    <div>
                    <h2>Home</h2>
                    <p>Welcome to our application!</p>
                    </div>
                </Route> */}
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/ehome/:user_id' element={<ECommerceHome/>}/>
                <Route path='/ehome_admin/admin_management_page' element={<AdminMgtHome/>}/>
                
            </Routes>
      </div>
    </div>
  );
};

export default RoutePage;