import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = ({ isSelected, icon }) => {
    return (
        <a href="#" className="w-full p-4 text-center block relative">
            {isSelected && (
                // Indicator to show this tab is currently selected
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[52px]">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" fill="#3643AA" />
                    </svg>
                </span>
            )}
            {icon}
        </a>
    )
}

export default NavItem
