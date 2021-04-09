import Content from './content.js';
import React, { useEffect, useState, useRef } from 'react';

//API key 393863da5a92eb3da8aad0a004438259
//add a counter to carousel

const INTERVAL = 5000;

const HomeDisplay = ( {baseUrl} ) => {
    const [displayThis, setDisplay] = useState(false);
    const [index, setIndex] = useState(0);
    const [tock, tick] = useState(true);
    const [load, setLoad] = useState(false);
    const timer = useRef();
    const first = useRef(true);
    useEffect(() => {
        console.log("display called");
        fetch("https://api.themoviedb.org/3/trending/all/week?api_key=393863da5a92eb3da8aad0a004438259")
        .then(res => res.json())
        .then(data => setDisplay(data.results))
        .then(() => {
            timer.current = setTimeout(() => tick(!tock), INTERVAL);
            first.current = false;
        })
    }, [])
    useEffect(() => {
        if(displayThis) {
            setLoad(true);
        }
        console.log("displayThis set");
    }, [displayThis])

    useEffect (() => {
        if (first.current === true) return;
        iterate();
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
    },[tock])

    const clickedIterate = () => {
        clearTimeout(timer.current);//CHECK THIS
        timer.current = setTimeout(() => tick(!tock), INTERVAL);
        iterate();
    }
    const turnVisible = (e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.backgroundColor = "#58585880"
        e.currentTarget.addEventListener("mouseleave", (e) => {
            e.currentTarget.style.opacity = "0";
        })
    }
    const iterate = () => {
        setIndex((index+4)%displayThis.length);
    }
    return (!load ? <div style={{marginTop: "15vh", fontSize: "40px", textAlign: "center"}}>loading...</div> :
        <div style={{margin: "0", position: "relative"}}>
            <Content baseUrl={baseUrl} index={index} displayObject={displayThis} key={index}/>
            <div style={leftButtonStyle} onMouseOver={turnVisible} onClick={clickedIterate}>&#x25C4;</div>
            <div style={rightButtonStyle} onMouseOver={turnVisible} onClick={clickedIterate}>&#x25BA;</div>
        </div>
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