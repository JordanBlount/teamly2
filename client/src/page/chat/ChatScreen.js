import React, { useEffect, useState } from 'react';
import { MessageList } from 'react-chat-elements'


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
                <div className="px-4 flex items-center justify-center">

                </div>
            )}
            {/* TODO: Add data here */}
            <span className="absolute hidden top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full">
                Today
            </span>
        </div>
        <MessageBar />
    </div>;
};

const NavBar = (props) => {
    return <header>
        {/* Wrapper componenet */}
        <div className="w-full h-24 bg-white">
            {/* Navbar */}
            <div className="mx-4 h-full flex justify-between">
                <div className="flex items-center">
                    {/* Back button */}
                    <button>
                        <svg className="" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6598 38C27.3611 38.001 27.0658 37.9351 26.7959 37.807C26.5259 37.679 26.2881 37.492 26.0998 37.26L16.4398 25.26C16.1457 24.9021 15.9849 24.4533 15.9849 23.99C15.9849 23.5268 16.1457 23.0779 16.4398 22.72L26.4398 10.72C26.7793 10.3116 27.2671 10.0547 27.796 10.006C28.3248 9.9572 28.8514 10.1205 29.2598 10.46C29.6683 10.7995 29.9251 11.2873 29.9739 11.8162C30.0226 12.345 29.8593 12.8716 29.5198 13.28L20.5798 24L29.2198 34.72C29.4644 35.0136 29.6198 35.3711 29.6675 35.7502C29.7153 36.1292 29.6534 36.5141 29.4893 36.8592C29.3252 37.2042 29.0657 37.495 28.7415 37.6972C28.4173 37.8994 28.0419 38.0045 27.6598 38Z" fill="#4B4B4B" />
                        </svg>
                    </button>
                    <Avatar people={[
                        {
                            name: "Gloria Hopkins",
                            profileImg: "https://randomuser.me/api/portraits/women/75.jpg",
                        },
                    ]} />
                    <div className="ml-3 flex flex-col">
                        {/* TODO: data needs to be rendered here */}
                        <p className="font-bold text-lg text-[#4B4B4B] leading-tight">Gloria Hopkins</p>
                        {/* TODO: Data needs to be rendered here */}
                        <p className="text-small text-[#4B4B4B] leading-tight">Online</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <button className='w-[44px] h-[44px] flex justify-center items-center'>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12.5C13.625 12.5 12.5 13.625 12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5ZM22.5 12.5C21.125 12.5 20 13.625 20 15C20 16.375 21.125 17.5 22.5 17.5C23.875 17.5 25 16.375 25 15C25 13.625 23.875 12.5 22.5 12.5ZM7.5 12.5C6.125 12.5 5 13.625 5 15C5 16.375 6.125 17.5 7.5 17.5C8.875 17.5 10 16.375 10 15C10 13.625 8.875 12.5 7.5 12.5Z" fill="#4B4B4B" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
}

const Avatar = ({ people }) => {
    // Will get the position of each avatar
    const getPosition = (index, length) => {
        if (length === 2) {
            return index === 0 ? 'left-2 top-0' : 'right-2 bottom-0';
        } else {
            switch (index) {
                case 0:
                    return 'left-2 top-0';
                case 1:
                    return 'right-1 top-6';
                case 2:
                    return 'bottom-1 left-0';
                case 3:
                    return '-bottom-0.5 right-2';
            }
        }
    }

    return <>
        {people.length > 1 ? (
            <span className="ml-2 relative w-16 h-16 rounded-full">
                {people.slice(0, 3).map((person, index) => (
                    // TODO: Remove "Math.random()" and add an actual value
                    <img key={Math.random(2000)} className={`w-8 h-8 rounded-full absolute ${getPosition(index, people.length)}`} src={person.profileImg} alt={person.name} />
                ))}
                {people.length > 3 && (
                    <span className={`w-8 h-8 flex justify-center items-center rounded-full bg-gray-600 absolute ${getPosition(3, people.length)} text-white text-xs`}>+{people.length - 3}</span>
                )}
            </span>
        ) : (
            <img className="ml-2 w-16 h-16 rounded-full" src={people[0].profileImg} alt={people[0].name} />
        )}
    </>
}

const MessageBar = (props) => {
    return <div className="bg-[#F8F8F8] flex">
        <div className="relative flex w-full justify-between">
            <label className="relative flex justify-between w-full">
                <span className="sr-only">Start typing</span>
                <textarea className="w-full py-4 pl-4 pr-4 bg-[#F8F8F8] placeholder-[#BBBBBB] text-black focus:outline-none" style={{ resize: "none" }} placeholder="Start typing" name="search"></textarea>
            </label>
            <div className="flex items-center space-x-8 pr-4">
                <button>
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0001 3.19543C21.9051 3.19543 27.5026 8.70117 27.5026 15.493C27.5026 22.2835 21.9051 27.7893 15.0001 27.7893C8.09506 27.7893 2.49756 22.2835 2.49756 15.493C2.49756 8.70117 8.09506 3.19543 15.0001 3.19543ZM15.0001 5.0397C13.5948 5.02471 12.2005 5.284 10.8978 5.80257C9.59515 6.32114 8.40997 7.0887 7.41089 8.0608C6.4118 9.03291 5.61865 10.1903 5.07734 11.4659C4.53602 12.7415 4.2573 14.1101 4.2573 15.4924C4.2573 16.8746 4.53602 18.2432 5.07734 19.5188C5.61865 20.7945 6.4118 21.9518 7.41089 22.9239C8.40997 23.896 9.59515 24.6636 10.8978 25.1821C12.2005 25.7007 13.5948 25.96 15.0001 25.945C17.7901 25.9029 20.4514 24.7832 22.4092 22.8277C24.3671 20.8721 25.4646 18.2376 25.4646 15.493C25.4646 12.7484 24.3671 10.1139 22.4092 8.15829C20.4514 6.20273 17.7901 5.08302 15.0001 5.04093V5.0397ZM10.5776 18.9147C11.1035 19.5737 11.775 20.1064 12.5412 20.4724C13.3074 20.8383 14.1483 21.028 15.0001 21.027C15.8508 21.0279 16.6906 20.8387 17.4561 20.4736C18.2216 20.1086 18.8927 19.5772 19.4188 18.9196C19.573 18.7277 19.7983 18.6039 20.0453 18.5754C20.2922 18.547 20.5406 18.6161 20.7357 18.7678C20.9308 18.9194 21.0567 19.1411 21.0856 19.384C21.1146 19.6269 21.0442 19.8712 20.8901 20.0631C20.1885 20.9392 19.2938 21.6472 18.2735 22.1336C17.2532 22.6201 16.1339 22.8723 15.0001 22.8713C13.8648 22.8722 12.7441 22.6192 11.7228 22.1314C10.7016 21.6436 9.8064 20.9338 9.10506 20.0557C8.9578 19.8631 8.89305 19.6214 8.92466 19.3825C8.95626 19.1435 9.08172 18.9262 9.27418 18.7771C9.46663 18.6279 9.71079 18.5589 9.95439 18.5846C10.198 18.6103 10.4217 18.7288 10.5776 18.9147V18.9147ZM11.2501 11.4958C11.4589 11.49 11.6668 11.5255 11.8614 11.6001C12.0561 11.6747 12.2336 11.7869 12.3834 11.9301C12.5332 12.0733 12.6522 12.2447 12.7335 12.4339C12.8149 12.6232 12.8567 12.8266 12.8567 13.0321C12.8567 13.2376 12.8149 13.441 12.7335 13.6303C12.6522 13.8196 12.5332 13.9909 12.3834 14.1341C12.2336 14.2773 12.0561 14.3896 11.8614 14.4642C11.6668 14.5388 11.4589 14.5742 11.2501 14.5684C10.8435 14.5571 10.4574 14.3903 10.1739 14.1034C9.89036 13.8165 9.73175 13.4322 9.73175 13.0321C9.73175 12.632 9.89036 12.2477 10.1739 11.9609C10.4574 11.674 10.8435 11.5072 11.2501 11.4958ZM18.7501 11.4958C18.9589 11.49 19.1668 11.5255 19.3614 11.6001C19.5561 11.6747 19.7336 11.7869 19.8834 11.9301C20.0332 12.0733 20.1522 12.2447 20.2335 12.4339C20.3149 12.6232 20.3567 12.8266 20.3567 13.0321C20.3567 13.2376 20.3149 13.441 20.2335 13.6303C20.1522 13.8196 20.0332 13.9909 19.8834 14.1341C19.7336 14.2773 19.5561 14.3896 19.3614 14.4642C19.1668 14.5388 18.9589 14.5742 18.7501 14.5684C18.3435 14.5571 17.9574 14.3903 17.6739 14.1034C17.3904 13.8165 17.2317 13.4322 17.2317 13.0321C17.2317 12.632 17.3904 12.2477 17.6739 11.9609C17.9574 11.674 18.3435 11.5072 18.7501 11.4958V11.4958Z" fill="#4B4B4B" />
                    </svg>
                </button>
                <button>
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3.19666C8.1075 3.19666 2.5 8.71223 2.5 15.4917C2.5 22.2712 8.1075 27.7868 15 27.7868C16.8325 27.7868 18.7012 27.3307 20.5525 26.4294L19.4463 24.2249C17.9413 24.9565 16.445 25.3278 15 25.3278C9.48625 25.3278 5 20.9151 5 15.4917C5 10.0684 9.48625 5.65567 15 5.65567C20.5137 5.65567 25 10.0684 25 15.4917V16.7212C25 17.5721 24.6088 19.1803 23.125 19.1803C21.38 19.1803 21.2575 16.9438 21.25 16.7212V10.5737H18.75V10.6044C17.6741 9.79167 16.3566 9.34891 15 9.3442C11.5538 9.3442 8.75 12.102 8.75 15.4917C8.75 18.8815 11.5538 21.6393 15 21.6393C16.8125 21.6393 18.435 20.8635 19.5775 19.6462C20.2325 20.7405 21.3375 21.6393 23.125 21.6393C25.9663 21.6393 27.5 19.1053 27.5 16.7212V15.4917C27.5 8.71223 21.8925 3.19666 15 3.19666ZM15 19.1803C12.9325 19.1803 11.25 17.5253 11.25 15.4917C11.25 13.4581 12.9325 11.8032 15 11.8032C17.0675 11.8032 18.75 13.4581 18.75 15.4917C18.75 17.5253 17.0675 19.1803 15 19.1803Z" fill="#4B4B4B" />
                    </svg>
                </button>
                <button>
                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.08144 3.76377L27.1139 14.9267C27.2395 14.9876 27.3453 15.0818 27.4193 15.1988C27.4932 15.3157 27.5324 15.4507 27.5324 15.5884C27.5324 15.7262 27.4932 15.8611 27.4193 15.9781C27.3453 16.095 27.2395 16.1893 27.1139 16.2502L4.07994 27.4131C3.9509 27.4755 3.80635 27.5 3.66352 27.4839C3.52069 27.4677 3.3856 27.4115 3.27432 27.3219C3.16305 27.2324 3.08029 27.1133 3.0359 26.9788C2.99151 26.8443 2.98736 26.7 3.02394 26.5633L5.97744 15.5951L3.02244 4.61508C2.98525 4.47804 2.98902 4.33336 3.03329 4.19836C3.07756 4.06337 3.16046 3.9438 3.27205 3.85396C3.38365 3.76412 3.51921 3.70784 3.66249 3.69184C3.80578 3.67584 3.95071 3.70082 4.07994 3.76377H4.08144ZM4.89594 5.80426L7.31094 14.7777L7.40394 14.76L7.49994 14.7541H17.9999C18.1874 14.7538 18.3681 14.8225 18.5066 14.9467C18.6451 15.0709 18.7313 15.2416 18.7483 15.4251C18.7652 15.6087 18.7116 15.7919 18.5981 15.9386C18.4846 16.0853 18.3194 16.1849 18.1349 16.2177L17.9999 16.2295H7.49994C7.45367 16.2297 7.40748 16.2258 7.36194 16.2177L4.89744 25.3741L25.0844 15.5892L4.89594 5.80426V5.80426Z" fill="#4B4B4B" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
}

const MessageItem = (props) => {
    return <div>

    </div>
}

export default ChatScreen;
