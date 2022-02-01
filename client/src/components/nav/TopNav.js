import React from 'react'

// TODO: Refractor where I can use this code as a base and wrap elements in it
const TopNav = ({ title, icon, iconClickFunction, leftSide}) => {
    return (
        <div className="h-24 mx-3 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-4xl font-bold text-[#4B4B4B]">{title}</h1>
                {leftSide}
            </div>
            {/* TODO: Make this more pratical  */}
            <button onClick={()=> iconClickFunction()}>
                {icon}
            </button>
        </div>
    )
}

export default TopNav
