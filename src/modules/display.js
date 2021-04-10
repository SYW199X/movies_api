import Content from './content.js';
import React, { useEffect, useState, useRef } from 'react';

//API key 393863da5a92eb3da8aad0a004438259
//add a counter to carousel

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
            const movieArray = Array(Math.ceil(numOfMovies/DISPLAY_NUM)).fill(null)
                .map((_, i) => <div key={i}>{i+1}</div>);
            setCounters(movieArray);
        })
        
    }, [])
    useEffect(() => {
        if(displayThis && counters) {
            setLoad(true);
        }
    }, [displayThis, counters])
    
    useEffect (() => {
        if (first.current === true) return;
        iterate();
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
    }, [tock])

    const clickedIterate = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
        iterate();
    }
    
    const iterate = () => {
        setIndex((index+4)%displayThis.length);
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
                <Content baseUrl={baseUrl} index={index} displayObject={displayThis} key={index}/>
                <div style={leftButtonStyle} onMouseOver={turnVisible} onClick={clickedIterate}>&#x25C4;</div>
                <div style={rightButtonStyle} onMouseOver={turnVisible} onClick={clickedIterate}>&#x25BA;</div>
            </div>
        <div style={{display:"grid", placeItems:"center"}}>
            <div style={counterStyle}>{counters}</div>
        </div>
        </>
    )
}
const counterStyle = {
    marginTop: "2vh", 
    fontSize: "1.5em", 
    fontWeight: "700",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "space-between",
    width: "10%"
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