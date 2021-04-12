import React, { useEffect, useState, useRef } from 'react';
import poster from '../poster.png';
import { useParams } from "react-router-dom";

export default function Movie( {baseUrl} ) {
    let { id, media } = useParams();
    const [picUrl, setPicUrl] = useState(false);
    const fetchedData = useRef();
    const scopedBaseUrl = useRef();
    useEffect(() => {
        async function getAll () {
            scopedBaseUrl.current = baseUrl || await fetch("https://api.themoviedb.org/3/configuration?api_key=393863da5a92eb3da8aad0a004438259")
                .then(res => res.json())
                .then(api => {return (`${api.images.secure_base_url}${api.images.poster_sizes[5]}`)})
            await fetch(`https://api.themoviedb.org/3/${media}/${id}?api_key=393863da5a92eb3da8aad0a004438259&language=en-US`)
                .then(res => res.json())
                .then(data => {
                    fetchedData.current = data;
                    return data.poster_path
                })
                .then(path => setPicUrl(path ? `${scopedBaseUrl.current}${path}` : poster))
        }
        getAll();
    }, [])
    
    return ( !picUrl ? <div style={{marginTop: "15vh", fontSize: 
                                                "40px", textAlign: "center"}}>loading...</div> :
        <div style={{"display": "flex", "marginTop": "10vh"}}>
            <div style={posterStyle}>
                <img src={picUrl} alt="poster" style={picStyle}/>
            </div>
            <div className="text">
                <h2 style={{"margin": "0"}}>
                    {/* English name takes precedence */}
                    {fetchedData.current.title || 
                    fetchedData.current.original_title || 
                    fetchedData.current.name}
                </h2> 
                {/* List creator names if applicable */}
                {(!fetchedData.current.created_by || !fetchedData.current.created_by[0]) ? null :
                    <>From {fetchedData.current.created_by.reduce((creators, creator, i, arr) => {
                        let flag = false;
                        if (i === arr.length - 1) flag = true;
                        return `${creators}${creators ? (flag ? ' and' : ',') : ''} ${creator.name}`;
                    }, '')}<br/></>} 
                {/* List release or initial air date if applicable */}
                {(!fetchedData.current.release_date && !fetchedData.current.first_air_date) ? null :
                    <>{fetchedData.current.release_date || fetchedData.current.first_air_date}</>}
            </div>
        </div>
    )
}
const posterStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    objectFit: "contain",
    marginLeft: "10vw"
}
const picStyle = {
    height: "70vh",
    objectFit: "contain",
    marginRight: "5vw"
}