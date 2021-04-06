import Content from './content.js';
import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//API key 393863da5a92eb3da8aad0a004438259

const HomeDisplay = ( {baseUrl} ) => {
    const [displayThis, setDisplay] = useState(false);
    const [index, setIndex] = useState(0);
    const [tock, tick] = useState(true);
    const [load, setLoad] = useState(false);
    const timer = useRef();
    const first = useRef(true);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/trending/all/week?api_key=393863da5a92eb3da8aad0a004438259")
        .then(res => res.json())
        .then(data => setDisplay(data.results))
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
        <>
            <Content baseUrl={baseUrl} index={index} displayObject={displayThis} key={index}/>
            <br/>
            <button style={{height: "50px", width: "100px"}} onClick={clickedIterate}>Next</button>
        </>
    )
}
export default HomeDisplay;
