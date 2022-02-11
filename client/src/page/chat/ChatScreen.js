import React, { useEffect, useRef, useState } from 'react';
import Avatar from '../../components/Avatar';
import Back from '../../components/buttons/Back';
import MessageBar from '../../components/chat/MessageBar';


const ChatScreen = () => {

    const [data, setData] = useState({})
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleMessage = (text) => {
        setMessages([...messages, { 
            id: 10,
            text 
        }])
    }

    return <div className="flex flex-col min-h-screen">
        <NavBar />
        <MessageList msgs={messages} />
        <div>
            <MessageBar sendMessage={handleMessage} />
        </div>
    </div>;
};

const MessageList = ({ msgs }) => {

    //const [messages, setMessages] = useState(msgs);
    const [displayDay, setDisplayDay] = useState(false);
    const [dayVisible, setDayVisible] = useState(false);
    const [displayDayTimeout, setDisplayDayTimeout] = useState(500);
    const messageListRef = useRef(null);
    const dayRef = useRef(null);

    // FIXME: Make sure that this does not cause glitches while scrolling
    useEffect(() => {
        let timer = null;

        if (displayDay) {
            timer = setTimeout(() => {
                setDisplayDay(false);
                dayRef.current.classList.add('hidden')
            }, displayDayTimeout)
        }
        return () => clearTimeout(timer);
    }, [displayDay])

    // NOTE: Sets the message list to start at the end. This is a big glitchy
    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [])

    // NOTE: This is a temp fix to make it so that when a new message is added (based on the length), it will scroll to the bottom. An example,
    // may be if you are at some random place in the message list and you send a message. It will push you to the bottom. Add a better fix.
    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [msgs.length])

    // TODO: We want to make this watch for when we are scrolling so that we can display messages at the top
    const handleScroll = () => {
        // setDisplayDay(true);
        // if(displayDay) {
        //     dayRef.current.classList.remove('hidden')
        // }
    }

    return <div className='relative grow px-4 overflow-y-auto h-64 flex flex-col-reverse'
        onScroll={handleScroll}
        ref={messageListRef}>
        <div className="top-notifications">
            <span
                className="fixed hidden top-[6.75rem] left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full"
                ref={dayRef}>
                Today
            </span>
        </div>

        <div className="space-y-4 my-4">
            <MessageItem
                myOwn
                message="I can ask Jeff to check it out on his Samsung device."
                time="3:15PM" />

            <MessageItem
                message="Today is fine."
                time="3:20PM"
                person={testData[0]}
                showTime={false} 
                sameSender={true} />

            <MessageItem
                message="Can you send me more details about the implementation? I’m curious to go over it tomorrow at our meeting."
                time="3:21PM"
                person={testData[0]} />

            <MessageItem
                myOwn
                message="Yeah. I'll forward you the link for the current implementation."
                time="Now" />

            <SystemMessage message={'Jordan Blount was added to the chat.'} />

            <MessageItem
                message="Hey Y'all!"
                time="Now"
                person={testData[1]} 
                showTime={false}
                sameSender={true}/>

            <MessageItem
                message="I have some update details on tomorrow's meeting."
                time="Now"
                person={testData[1]} />

            {msgs.length > 0 && msgs.map((msg, index) => (
                // FIXME: Add an actual key here
                <MessageItem key={Math.random(2000)}
                    myOwn
                    message={msg.text}
                    time={"Now"} 
                    showTime={msgs[index - 1]?.id === msg.id && index !== msgs.length - 1 ? false : true || index === 0 && msgs[0].id === msgs[1]?.id ? false : true}
                    sameSender={msgs[index - 1]?.id === msg.id}/>
            ))}

            <div>
                {/* TODO: Add a typing indicator here.... */}
            </div>
        </div>
    </div>

}

const MessageItem = ({ myOwn, message, time, person, showTime = true, sameSender = false }) => {
    // NOTE: Using '!mt-0.5' to specify "important" is not the best solution. I am going to change the spacing on this
    return <div className={`flex ${myOwn ? 'justify-end' : ''} ${sameSender ? '!mt-0.5 !mb-0.5' : ''}`}>
        {!myOwn && !sameSender &&
            <img className="rounded-full w-8 h-8 mr-2 self-end"
                src={person.profileImg} />
        }
        <div className={`flex flex-col ${!myOwn && sameSender ? 'ml-[40px]' : ''} ${myOwn ? 'items-end' : ''}`}>
            <div className={`${myOwn ? 'text-white' : 'text-[#4B4B4B]'} ${myOwn ? 'bg-[#4B5078]' : 'bg-[#EBEBEB]'} border border-[#DDDDDD] rounded-lg py-1 px-2 max-w-xs`}>
                {/* FIXME: Word wrapping to make sure that this wraps correctly */}
                {/* We need a character limit instead of just a word limit */}
                <p className="break-words leading-snug">{message}</p>
            </div>
            {showTime && 
                <p className="text-[#BDBDBD] text-sm mt-1">{time}</p>
            }
        </div>
    </div>
}

const SystemMessage = ({ message }) => {
    return <div className={`flex justify-center`}>
        <span className={`text-[#4B4B4B]`}>{message}</span>
    </div>
}

const testData = [
    {
        name: "Gloria Hopkins",
        profileImg: "https://randomuser.me/api/portraits/women/75.jpg",
    },
    {
        name: "Jordan Blount",
        profileImg: "https://randomuser.me/api/portraits/men/59.jpg"
    },
    {
        name: "Sam Smith",
        profileImg: "https://randomuser.me/api/portraits/men/78.jpg"
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
                    <ChatInfo isGroup people={testData} status="Online" />
                </div>
                <ChatOptions onClick={() => alert("This was clicked")} />
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
                <p className="font-bold text-lg text-[#4B4B4B] leading-tight overflow-hidden whitespace-nowrap overflow-ellipsis w-36 sm:w-full">{renderNames()}</p>
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
