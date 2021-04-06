import React from 'react'

const carousel = ({list}) => {
    
    const divStyle = {
        width: "60vw",
        height: "50vh"
    }
    return (
        <div style={divStyle}>
            {list}
        </div>
    )
}

export default carousel