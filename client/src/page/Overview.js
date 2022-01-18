import React from 'react'
import TopNav from '../components/nav/TopNav'

const Overview = () => {

    const handleClick = () => {
        window.alert("Test");
    }

    return (
        <>
            <TopNav title="Overview" icon={
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.25 4.5C4.65326 4.5 4.08097 4.73705 3.65901 5.15901C3.23705 5.58097 3 6.15326 3 6.75V12.75C3 13.3467 3.23705 13.919 3.65901 14.341C4.08097 14.7629 4.65326 15 5.25 15H18.75C19.3467 15 19.919 14.7629 20.341 14.341C20.7629 13.919 21 13.3467 21 12.75V6.75C21 6.15326 20.7629 5.58097 20.341 5.15901C19.919 4.73705 19.3467 4.5 18.75 4.5H5.25ZM5.25 16.5C4.65326 16.5 4.08097 16.7371 3.65901 17.159C3.23705 17.581 3 18.1533 3 18.75V24.75C3 25.3467 3.23705 25.919 3.65901 26.341C4.08097 26.7629 4.65326 27 5.25 27H18.75C19.3467 27 19.919 26.7629 20.341 26.341C20.7629 25.919 21 25.3467 21 24.75V18.75C21 18.1533 20.7629 17.581 20.341 17.159C19.919 16.7371 19.3467 16.5 18.75 16.5H5.25ZM25.5 18.6555C25.0567 18.7691 24.5933 18.7798 24.1452 18.687C23.6971 18.5942 23.2761 18.4003 22.9143 18.12C22.5526 17.8397 22.2596 17.4805 22.0578 17.0698C21.8561 16.659 21.7508 16.2076 21.75 15.75C21.7498 15.0848 21.9708 14.4384 22.3781 13.9124C22.7854 13.3865 23.3559 13.0108 24 12.8445C24.492 12.7178 25.008 12.7178 25.5 12.8445C26.1446 13.0102 26.7159 13.3857 27.1237 13.9117C27.5316 14.4377 27.753 15.0844 27.753 15.75C27.753 16.4156 27.5316 17.0623 27.1237 17.5883C26.7159 18.1143 26.1446 18.4898 25.5 18.6555ZM24.75 4.5C24.9489 4.5 25.1397 4.57902 25.2803 4.71967C25.421 4.86032 25.5 5.05109 25.5 5.25V11.3115C25.0035 11.2281 24.4965 11.2281 24 11.3115V5.25C24 5.05109 24.079 4.86032 24.2197 4.71967C24.3603 4.57902 24.5511 4.5 24.75 4.5ZM24.75 20.25C24.495 20.25 24.2445 20.229 24 20.1885V26.25C24 26.4489 24.079 26.6397 24.2197 26.7803C24.3603 26.921 24.5511 27 24.75 27C24.9489 27 25.1397 26.921 25.2803 26.7803C25.421 26.6397 25.5 26.4489 25.5 26.25V20.1885C25.2555 20.229 25.005 20.25 24.75 20.25Z" fill="#4B4B4B" />
                </svg>
            } iconClickFunction={handleClick}/>
        </>
    )
}

export default Overview
