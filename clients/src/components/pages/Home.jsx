 import React, { useContext } from 'react';
import LeftNav from '../LetNav';
import Thread from '../Thread';
import { UidContext } from '../AppContext';

export default function Home() {

    const uid = useContext(UidContext)

    return (
        <div className='home'>
            <LeftNav />
            <div className='main'>
                <div className='home-header'>

                </div>
                <Thread />
            </div>
        </div>
    )
}
