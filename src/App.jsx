import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Admin/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;