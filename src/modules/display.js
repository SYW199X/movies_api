import '../App.css';
import Content from './content.js';
import React, { useEffect, useState, useRef } from 'react';

//API key 393863da5a92eb3da8aad0a004438259

const INTERVAL = 5000;
const DISPLAY_NUM = 4;

const HomeDisplay = ( {baseUrl} ) => {
    const [displayThis, setDisplay] = useState(false);
    const [index, setIndex] = useState(0);
    const [tock, tick] = useState(true);
    const [load, setLoad] = useState(false);
    const [counters, setCounters] = useState(false);
    const timer = useRef();
    const first = useRef(true);
    // const numOfMovies = useRef(false);
    useEffect(() => {
        let numOfMovies = 0;
        fetch("https://api.themoviedb.org/3/trending/all/week?api_key=393863da5a92eb3da8aad0a004438259")
        .then(res => res.json())
        .then(data => {
            numOfMovies = data.results.length;
            setDisplay(data.results)})
        .then(() => {
            timer.current = setTimeout(() => tick(!tock), INTERVAL);
            first.current = false;
        })
        .then(() => {
            const movieNumArray = Array(Math.ceil(numOfMovies/DISPLAY_NUM)).fill(null)
                .map((_, i) => {
                    return ( i === 0 ? <div className="count currCount" key={i}>{i+1}</div> :
                        <div className="count" key={i}>{i+1}</div>
                    )
                });
            setCounters(movieNumArray);
        })
        
    }, [])
    useEffect(() => {
        if(displayThis && counters) {
            setLoad(true);
        }
    }, [displayThis, counters])
    
    useEffect (() => {
        if (first.current === true) return;
        iterate(DISPLAY_NUM);
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
    }, [tock])

    useEffect(() => {
        if (document.querySelector('.currCount')) {
            document.querySelectorAll('.currCount').forEach(elem => elem.classList.remove('currCount'));
        }
        if (document.querySelectorAll('.count').length === 0) return;
        document.querySelectorAll('.count')[Math.floor(index/DISPLAY_NUM)].classList.add('currCount');
    }, [index])

    const leftClick = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
        iterate(-DISPLAY_NUM)
    }
    const rightClick = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
        iterate(DISPLAY_NUM)
    }
    const iterate = (amount) => {
        setIndex(((index+amount+displayThis.length)%displayThis.length)%displayThis.length);
    }
    const turnVisible = (e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.backgroundColor = "#58585880"
        e.currentTarget.addEventListener("mouseleave", (e) => {
            e.currentTarget.style.opacity = "0";
        })
    }
    return (!load ? <div style={{marginTop: "15vh", fontSize: "40px", textAlign: "center"}}>loading...</div> :
        <>
            <div style={{margin: "0", position: "relative"}}>
                <Content baseUrl={baseUrl} index={index} displayObject={displayThis} displayNum={DISPLAY_NUM} key={index}/>
                <div style={leftButtonStyle} onMouseOver={turnVisible} onClick={leftClick}>&#x25C4;</div>
                <div style={rightButtonStyle} onMouseOver={turnVisible} onClick={rightClick}>&#x25BA;</div>
            </div>
            <div style={{display:"grid", placeItems:"center"}}>
                <div className="counter">{counters}</div>
            </div>
        </>
    )
}

const buttonStyle = {
    position: "absolute",
    top: "0",
    bottom: "0",
    display: "flex",
    opacity: "0",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10vh",
    color: "white",
    fontFamily: "Arial, Helvetica, sans-serif",
    cursor: "pointer",
    padding: "0 10px"
}
const rightButtonStyle = {
    ...buttonStyle,
    right: "0"
}
const leftButtonStyle = {
    ...buttonStyle,
    left: "0"
}

export default HomeDisplay;