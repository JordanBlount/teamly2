import React, { useState } from 'react'
import Conversation from '../components/Conversation'
import TopNav from '../components/nav/TopNav'
import Section from '../components/Section'

const Chat = () => {

    // This is test data only.
    const people = [
        {
            name: "Gloria Hopkins",
            profileImg: "https://randomuser.me/api/portraits/women/75.jpg",
        },
        {
            name: "Jeff Bezos",
            profileImg: "https://randomuser.me/api/portraits/men/0.jpg",
        },
        {
            name: "May Jones",
            profileImg: "https://randomuser.me/api/portraits/women/36.jpg"
        }
    ]

    const createNewChat = () => {
        //
    }

    // This will be holding all the information regarding out conversations.
    const [conversations, setConversations] = useState([]);

    return (
        <>
            <TopNav title="Chat" icon={
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 13.75H11.25M15 10V13.75V10ZM15 13.75V17.5V13.75ZM15 13.75H18.75H15Z" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17.5 23.75C22.2137 23.75 24.5712 23.75 26.035 22.285C27.5 20.8212 27.5 18.4637 27.5 13.75C27.5 9.03625 27.5 6.67875 26.035 5.215C24.5712 3.75 22.2137 3.75 17.5 3.75H12.5C7.78625 3.75 5.42875 3.75 3.965 5.215C2.5 6.67875 2.5 9.03625 2.5 13.75C2.5 18.4637 2.5 20.8212 3.965 22.285C4.78125 23.1025 5.875 23.4638 7.5 23.6225" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17.5001 23.75C15.9551 23.75 14.2526 24.375 12.6988 25.1813C10.2013 26.4775 8.95256 27.1263 8.33756 26.7125C7.72256 26.3 7.83881 25.0188 8.07256 22.4575L8.12506 21.875" stroke="#4B4B4B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            } iconClickFunction={createNewChat}
                leftSide={
                    <MessageCount defaultCount={5} />
                } />
            <Section noXSpacing noBottomMargin >
                {/* Search bar */}
                {/* FIXME: When this is stretch due to desktop proportions, it completely breaks down. */}
                <label className="relative block mb-2">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-6">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z" fill="#7D7D7D" />
                        </svg>
                    </span>
                    <input className="block w-[95%] mx-auto rounded-md py-3 pl-11 pr-4 bg-[#ECECEC] focus:outline-none" type="text" placeholder="Search" name="search" />
                </label>

                {/* Conversation list */}
                <div className="grid grid-cols-1">
                    <Conversation people={people} message="How are you all doing today?" date="Today" name="Executives" unreadMsgCount={2} />
                    <Conversation people={people} message="Multiple Messages" date="Today" name="Frontend Developers" special />
                    <Conversation people={[{
                        name: "Jeff Bezos",
                        profileImg: "https://randomuser.me/api/portraits/men/0.jpg",
                    }]} message="How are you doing today, Jordan?" date="Today" name="Executives" unreadMsgCount={1} />
                    <Conversation people={people} message="How are you all doing today?" date="Today" name="Executives" unreadMsgCount={2} />
                </div>
            </Section>
        </>
    )
}

const MessageCount = ({ defaultCount = 0 }) => {

    const [count, setCount] = useState(defaultCount);

    return (
        <span className="ml-2 bg-[#4B5078] w-7 h-7 flex justify-center items-center rounded-md text-white text-lg">{count}</span>
    )
}

export default Chat
