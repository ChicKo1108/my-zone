import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import routers from './routers/routers';
import './app.scss';

ReactDOM.render(
    <Router>
        <div className='app-wrapper'>
            <div className='page-wrapper'>
                <Routes>
                    { routers.map(({ path, element }) => (<Route path={path} element={element} />)) }
                </Routes>
            </div>
        </div>
    </Router>
    // <Home />
,document.getElementById('app'));