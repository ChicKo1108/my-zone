import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routers from './routers/routers';
import Header from 'components/header/header';
import './app.scss';
import HttpClient from './utils/axios';

HttpClient.post('/api/user/view').then(() => console.log('new UV is uploaded.'));

ReactDOM.render(
    <Router>
        <Header />
        <div className='app-wrapper'>
            <div className='page-wrapper'>
                <Routes>
                    { routers.map(({ path, element }) => (<Route path={path} element={element} key={path} />)) }
                </Routes>
            </div>
        </div>
    </Router>
,document.getElementById('app'));