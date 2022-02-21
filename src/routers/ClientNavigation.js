import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';
import Auth from '../pages/Auth/Auth';
import Landing from '../pages/Landing';
import Wizard from '../pages/Wizard';
import Records from '../pages/Records';
import Tattoo from '../pages/Tattoo';

export default function ClientNavigation(props) {
    const { auth } = props;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} exact />
                <Route path="login" element={<Auth />} exact />
                <Route path="wizard" element={<Wizard />} exact />
                <Route path="records" element={<Records />} exact />
                <Route path="tattoo" element={<Tattoo />} exact />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
