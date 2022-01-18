import React from 'react'

const ThreadCard = ({title, date, teamName, authors}) => {

    const getWidth = () => {
        // FIXME: Nested ternary statements. This needs to be changed.
        return authors.length === 1 ? '45px' : authors.length === 3 ? '98px' : '54px';
    }

    const getMargin = () => {
        return authors.length === 2 ? 'ml-6': 'ml-2';
    }
    
    return (
        <div className="w-full rounded-md shadow-md p-6">
            <p className="text-2xl text-[#4B5078] medium">{title}</p>
            <p className="text-sm text-[#8B8B8B]">{date}</p>
            {/* Authors container */}
            <div className="mt-4 flex items-center">
                {/* Avatar */}
                <div className={`flex relative w-[${getWidth()}] h-[45px]`}>
                    {authors.map((person, index) => (
                        <img className={`w-[45px] h-[45px] rounded-full absolute left-[${index === 0 ? '-3px' : `${(-3) + (index * 29)}px`}]`} src={person?.profileImg} alt={person.name} />
                    ))}
                </div>
                {/* Who published it */}
                <p className={`${getMargin()} text-md text-[#8B8B8B]`}>{teamName}</p>
            </div>
        </div>
    )
}

// const Avatar = () => {
//     return (
        
//     )
// }

export default ThreadCard
