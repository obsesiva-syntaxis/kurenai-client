import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import LayoutBasic from '../layouts/LayoutBasic';
import Calendar from '../pages/Calendar';
import Request from '../pages/Request'
import Billing from '../pages/Billing'
import User from '../pages/User';

export default function Navigation(props) {
    const { auth } = props;
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<LayoutBasic />}>
                    <Route index element={<Home />} />
                    <Route path="/admin/user" element={<User />} exact />
                    <Route path="/admin/calendar" element={<Calendar />} exact />
                    <Route path="/admin/request" element={<Request />} exact />
                    <Route path="/admin/billing" element={<Billing />} exact />

                    <Route path="*" element={<Navigate to="/admin" />} />
                </Route>

                <Route path="*" element={<Navigate to="/admin" />} />
                {
                    auth ? (
                        <Route element={<Navigate to="/admin" />} />
                        ):(
                            <Route element={<Navigate to="/" />} />
                    )
                }
            </Routes>
        </Router>
    )
}
