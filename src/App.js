import './App.css';
import './header.css';
import Header from './modules/header.js';
import Movie from './modules/movie.js';
import HomeDisplay from './modules/display.js';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//API key 393863da5a92eb3da8aad0a004438259

const App = () => {
    const [baseUrl, setBaseUrl] = useState(false);
    useEffect(() => {
        console.log("fetch called");
        fetch("https://api.themoviedb.org/3/configuration?api_key=393863da5a92eb3da8aad0a004438259")
            .then(res => res.json())
            .then(api => setBaseUrl(`${api.images.secure_base_url}${api.images.poster_sizes[5]}`))
    },[])
    return (
        <Router>
            <Header />
            <Route path='/' exact>
                <HomeDisplay baseUrl={baseUrl}/>
            </Route>
            <Route path='/movies/:media/:id'>
                <Movie baseUrl={baseUrl}/>
            </Route>
        </Router>
    )
}

export default App;
