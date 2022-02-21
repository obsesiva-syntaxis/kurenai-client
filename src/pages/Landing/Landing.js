import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Landing.scss';

export default function Landing() {
    const navigate = useNavigate();

    const clickBtn = () => {
        navigate('/login');
    }

    return (
        <div className="landing">
            <div className="landing__banner1"></div>
            <div className="landing__banner2"></div>
            <div className="landing__banner3"></div>
            <div className="landing__banner4"></div>
            <div className="landing__banner5"></div>
            <div className="landing__banner6"></div>
            <div className="landing__banner7"></div>
            <div className="landing__banner8"></div>
            <div className="landing__banner9">
                <h1 className="title" onClick={ clickBtn }>K</h1>
            </div>
            <div className="landing__banner10">
                <h1 className="title" onClick={ clickBtn }>U</h1>
            </div>
            <div className="landing__banner11">
                <h1 className="title" onClick={ clickBtn }>R</h1>
            </div>
            <div className="landing__banner12">
                <h1 className="title" onClick={ clickBtn }>E</h1>
            </div>
            <div className="landing__banner13">
                <h1 className="title" onClick={ clickBtn }>N</h1>
            </div>
            <div className="landing__banner14">
                <h1 className="title" onClick={ clickBtn }>A</h1>
            </div>
            <div className="landing__banner15">
                <h1 className="title" onClick={ clickBtn }>I</h1>
            </div>
            <div className="landing__banner16">
            </div>
            <div className="landing__banner17"></div>
            <div className="landing__banner18"></div>
            <div className="landing__banner19"></div>
            <div className="landing__banner20"></div>
            <div className="landing__banner21"></div>
            <div className="landing__banner22"></div>
            <div className="landing__banner23"></div>
            <div className="landing__banner24"></div>
            <div className="landing__banner26"/>
            {/* <button className="landing__banner26" onClick={ clickBtn }></button> */}
        </div>
    )
}
