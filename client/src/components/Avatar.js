import React from 'react';

const Avatar = ({ people, status }) => {
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

export default Avatar;
