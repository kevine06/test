 import React from 'react';
import LeftNav from '../LetNav';
import Thread from '../Thread';

export default function Home() {
    return (
        <div className='home'>
            <LeftNav />
            <div className='main'>
                <Thread />
            </div>
        </div>
    )
}
