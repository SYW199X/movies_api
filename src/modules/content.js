import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import poster from '../poster.png'


export default function Content( {baseUrl, index, displayObject, displayNum} ) {
    const props = useSpring({
        to: {opacity: 1}, 
        from: {opacity: 0},
        config: {duration: 500},
        position: "relative"
    });
    const [posterDisplay, setPosters] = useState();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const posterArray = Array(displayNum).fill(null)
            .map((_, i) => {
                return (
                    <Link key={i} style={linkStyle} to={`/movies/${displayObject[(index+i)%displayObject.length].media_type}/${displayObject[(index+i)%displayObject.length].id}`}><img style={picStyle} src={displayObject[(index+i)%displayObject.length].poster_path ? `${baseUrl}${displayObject[(index+i)%displayObject.length].poster_path}` : poster} onLoad={setLoadStatus} alt="movie-poster"/></Link>
                )
            });
        setPosters(posterArray);
    }, [])
    useEffect(() => {
        if (!posterDisplay || !posterDisplay[0]) return;
        console.log(posterDisplay[0])
    }, [posterDisplay])
    const setLoadStatus = () => {
        setLoaded(true);
    }
    return ( !posterDisplay ? <div style={{marginTop: "5vh", fontSize: "20px", textAlign: "center"}}>loading posters</div> :
        <>
            <animated.div style={props}>
                <div style={divStyle}>
                    {posterDisplay}
                    {/* <Link style={linkStyle} to={`/movies/${displayObject[(index)%displayObject.length].media_type}/${displayObject[(index)%displayObject.length].id}`}><img style={picStyle} src={displayObject[(index)%displayObject.length].poster_path ? `${baseUrl}${displayObject[(index)%displayObject.length].poster_path}` : poster} alt="movie-poster"/></Link>

                    <Link style={linkStyle} to={`/movies/${displayObject[(index+1)%displayObject.length].media_type}/${displayObject[(index+1)%displayObject.length].id}`}><img style={picStyle} src={displayObject[(index+1)%displayObject.length].poster_path ? `${baseUrl}${displayObject[(index+1)%displayObject.length].poster_path}` : poster} alt="movie-poster"/></Link>

                    <Link style={linkStyle} to={`/movies/${displayObject[(index+2)%displayObject.length].media_type}/${displayObject[(index+2)%displayObject.length].id}`}><img style={picStyle} src={displayObject[(index+2)%displayObject.length].poster_path ? `${baseUrl}${displayObject[(index+2)%displayObject.length].poster_path}` : poster} alt="movie-poster"/></Link>

                    <Link style={linkStyle} to={`/movies/${displayObject[(index+3)%displayObject.length].media_type}/${displayObject[(index+3)%displayObject.length].id}`}><img style={picStyle} src={displayObject[(index+3)%displayObject.length].poster_path ? `${baseUrl}${displayObject[(index+3)%displayObject.length].poster_path}` : poster} alt="movie-poster"/></Link> */}
                </div>
            </animated.div>
        </>
    )
}
const divStyle = {
    position: "relative",
    height: "60vh",
    marginTop: "5vh",
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "transparent",
    boxSizing: "border-box"
}
const picStyle = {
    height: "100%",
    objectFit: "contain"
}
const linkStyle = {
    height: "100%",
    objectFit: "contain"
}