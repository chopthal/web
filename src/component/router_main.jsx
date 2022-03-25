import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import LunchMain from './lunch_main';

const RouterMain = (props) => {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/lunch' element={<LunchMain />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default RouterMain;