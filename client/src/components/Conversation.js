import React from 'react'

const Conversation = (props) => {

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

    // FIXME: Put this code into the return method. We need it incase someone does not have a profile picture.
    const avatar = (person, index) => {
        if(person.profileImg !== null) {
            return (
                <img className={`w-8 h-8 rounded-full absolute ${getPosition(index, props.people.length)}`} src={person.profileImg} alt={person.name} />
            )
        } else {
            return (
                <span className={`w-8 h-8 flex justify-center items-center rounded-full bg-gray-600 absolute ${getPosition(3, props.people.length)} text-white text-xs`}>{getInitials(person.name)}</span>
            )
        }
    }

    const getInitials = (name) => {
        const nameSplit = name.split(" ");
        return `${nameSplit[0][0].toUpperCase()}${nameSplit[nameSplit.length - 1][0].toUpperCase()}`
    }

    return (
        <div className={`h-20 px-3 py-2 flex justify-between hover:bg-gray-200 ${props.special && `bg-[#FFE090]`}`}>
            <div className="left-side flex items-center">
                {props.people.length > 1 ? (
                    <span className="relative w-16 h-16 rounded-full">
                        {props.people.slice(0, 3).map((person, index) => (
                            // TODO: Remove "Math.random()" and add an actual value
                            <img key={Math.random(2000)} className={`w-8 h-8 rounded-full absolute ${getPosition(index, props.people.length)}`} src={person.profileImg} alt={person.name} />
                        ))}
                        {props.people.length > 3 && (
                            <span className={`w-8 h-8 flex justify-center items-center rounded-full bg-gray-600 absolute ${getPosition(3, props.people.length)} text-white text-xs`}>+{props.people.length - 3}</span>
                        )}
                    </span>
                ) : (
                    <img className="w-16 h-16 rounded-full" src={props.people[0].profileImg} alt={props.people[0].name} />
                )}
                <div className="ml-2 flex flex-col">
                    <p className="text-lg font-medium text-[#4B4B4B] leading-tight">{props.people.length > 1 ? props?.name : props.people[0].name}</p>
                    <p className="text-sm leading-tight">{props.message}</p>
                </div>
            </div>
            <div className="right-side flex flex-col justify-center items-end">
                {props.unreadMsgCount > 0 && (
                    // TODO: This can be extracted and turned into a reuseable component
                    <div className="bg-[#4B5078] w-6 h-6 flex justify-center rounded-md text-white text-base">{props.unreadMsgCount}</div>
                )}
                <p className={`text-xs mt-2 ${props.unreadMsgCount === 0 && 'justify-self-end'}`}>{props.date}</p>
            </div>
        </div>
    )
}

export default Conversation
