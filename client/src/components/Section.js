import React from 'react'

const Section = (props) => {
    return (
        <section className={`${props.noXSpacing ? `` : `mx-6`} ${props.noBottomMargin ? `` : `mb-11`}`}>
            {props?.title && 
                (<h2 className="text-2xl font-medium text-[#7A7A7A] mb-2">{props.title}</h2>)
            }
            {props.children}
        </section>
    )
}

export default Section
