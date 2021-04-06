import './App.css';
import './header.css';
import Header from './modules/header.js';
import Content from './modules/content.js';
import Movie from './modules/movie.js';
import HomeDisplay from './modules/display.js';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//API key 393863da5a92eb3da8aad0a004438259

const App = () => {
    const [displayThis, setDisplay] = useState(false);
    const [baseUrl, setBaseUrl] = useState(true);
    const [index, setIndex] = useState(0);
    const [tock, tick] = useState(true);
    const [load, setLoad] = useState(false);
    const timer = useRef();
    const first = useRef(true);
    useEffect(() => {
        console.log("fetch called");
        fetch("https://api.themoviedb.org/3/configuration?api_key=393863da5a92eb3da8aad0a004438259")
            .then(res => res.json())
            .then(api => setBaseUrl(`${api.images.base_url}${api.images.poster_sizes[5]}`))
            .then(() => {
                fetch("https://api.themoviedb.org/3/trending/all/day?api_key=393863da5a92eb3da8aad0a004438259")
                .then(res => res.json())
                .then(data => {
                    setDisplay(data.results);
                    // setLoad(false);
                    // movieArray = data.results.map(movie => 
                    //     <Content key={movie.id} picUrl={`${baseUrl}${movie.poster_path}`}
                    //     name={movie.original_title ? movie.original_title : movie.name}/>
                    // )
                })
                // .then(() => {
                //     setDisplay(movieArray);
                //     setLoad(false);
                //     console.log(movieArray);
                // })
            })
            .then(() => {
                timer.current = setTimeout(() => tick(!tock), 5000);
                first.current = false;
            })
    }, [])

    useEffect(() => {
        if(displayThis) {
            setLoad(true);
        }
    }, [displayThis])

    useEffect (() => {
        if (first.current === false) {
            iterate();
            timer.current = setTimeout(() => tick(!tock), 5000);
        }
    },[tock])

    const clickedIterate = () => {
        clearInterval(timer.current);
        timer.current = setTimeout(() => tick(!tock), 5000);
        iterate();
    }

    const iterate = () => {
        setIndex((index+4)%displayThis.length);
    }

    return (!load ? <div style={{fontSize: "40px", textAlign: "center"}}>loading...</div> :
        <Router>
            <Header />
            <Route path='/' exact>
                <HomeDisplay />
            </Route>
            <Route path='/movies/:media/:id'>
                <Movie baseUrl={baseUrl}/>
            </Route>
        </Router>
    )
}

export default App;