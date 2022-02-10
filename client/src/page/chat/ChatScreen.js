import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../components/Avatar';
import Back from '../../components/buttons/Back';
import MessageBar from '../../components/chat/MessageBar';


const ChatScreen = () => {

    const [data, setData] = useState({})
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }


    // FIXME: Make the NavBar and MessageBar fixed
    return <div className="flex flex-col min-h-screen">
        <NavBar />
        {/* FIXME: This needs to stretch the full length while the other componenets are "fixed" */}
        <div className='relative grow bg-gray-200'>
            {messages.length > 0 ? (
                <div className="px-4 grid grid-cols-1">

                </div>
            ) : (
                // <div className="fixed flex left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                //     Nothing to see here
                // </div>
                <div 
                    className="px-4 flex items-center justify-center"
                    onScroll={() => console.log("I am scrolling")}>
                </div>
            )}
            {/* TODO: Add data here */}
            <span className="absolute hidden top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full">
                Today
            </span>
        </div>
        {/* NOTE: This should be fixed instead of our component itself */}
        <div>
            <MessageBar />
        </div>
    </div>;
};

const testData = [
    {
        name: "Gloria Hopkins",
        profileImg: "https://randomuser.me/api/portraits/women/75.jpg",
    }
]

const NavBar = (props) => {
    return <header>
        {/* Wrapper componenet */}
        <div className="w-full h-24 bg-white">
            {/* Navbar */}
            <div className="mx-4 h-full flex justify-between">
                <div className="flex items-center">
                    <Back />
                    <ChatInfo people={testData} status="Online"/>
                </div>
            <ChatOptions onClick={() => alert("This was clicked")}/>
            </div>
        </div>
    </header>
}

const ChatInfo = ({ people, isTeam, teamName, isGroup, status }) => {
    
    const [currentStatus, setCurrentStatus] = useState(!status ? '' : status)

    const renderNames = () => {
        return people.slice(0, 3).map((person) => person.name).join(', ');;
    }

    return <>
        <Avatar people={people} />
        <div className="ml-3 flex flex-col">
            {isTeam &&
                <p className="font-bold text-lg text-[#4B4B4B] leading-tight overflow-hidden whitespace-nowrap overflow-ellipsis w-64 sm:w-full">{teamName}</p>
            }
            {isGroup && 
                <p className="font-bold text-lg text-[#4B4B4B] leading-tight overflow-hidden whitespace-nowrap overflow-ellipsis w-64 sm:w-full">{renderNames()}</p>
            }
            {!isTeam && !isGroup &&
                <p className="font-bold text-lg text-[#4B4B4B] leading-tight overflow-hidden whitespace-nowrap overflow-ellipsis w-64 sm:w-full">{people[0].name}</p>    
            }
            {/* TODO: Data needs to be rendered here */}
            <p className="text-small text-[#4B4B4B] leading-tight">{currentStatus}</p>
        </div>
    </>
}

const ChatOptions = ({ onClick }) => {
    return <>
        <div className="flex items-center">
            <button 
                className='w-[44px] h-[44px] flex justify-center items-center'
                onClick={onClick}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12.5C13.625 12.5 12.5 13.625 12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5ZM22.5 12.5C21.125 12.5 20 13.625 20 15C20 16.375 21.125 17.5 22.5 17.5C23.875 17.5 25 16.375 25 15C25 13.625 23.875 12.5 22.5 12.5ZM7.5 12.5C6.125 12.5 5 13.625 5 15C5 16.375 6.125 17.5 7.5 17.5C8.875 17.5 10 16.375 10 15C10 13.625 8.875 12.5 7.5 12.5Z" fill="#4B4B4B" />
                </svg>
            </button>
        </div>
    </>
}

export default ChatScreen;
