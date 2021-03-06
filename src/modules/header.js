import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo1.svg'

const Header = () => {
    useEffect(() => {
    }, [])
    return (
        <header className="header">
            <title>My Movies</title>
            <div className="logo-text">
                <img src={logo} className="logo" alt="logo"/>
            </div>
                
            <div className="nav">
                <Link to="/movies_api">Top Movies</Link>
                {/* <Link to="./">Coming Soon</Link> */}
            </div>
        </header>
    )
}

export default Header;