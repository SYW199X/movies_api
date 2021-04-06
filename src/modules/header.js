import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'

const Header = () => {

    return (
        <header className="header">
            <title>My Movies</title>
            <div className="logo-text">
                <img src={logo} className="logo" alt="logo"/>
            </div>
                
            <div className="nav">
                <Link to="/">Top Movies</Link>
                <Link to="/">Movie List</Link>
                <Link to="/">Coming Soon</Link>
            </div>
        </header>
    )
}

export default Header;