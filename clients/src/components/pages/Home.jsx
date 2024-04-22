 import React, { useContext } from 'react';
import LeftNav from '../LetNav';
import Thread from '../Thread';
import { UidContext } from '../AppContext';
import NewPostForm from '../Post/NewPostForm';
import Log from '../../components/Log'

export default function Home() {

    const uid = useContext(UidContext)

    return (
        <div className='home'>
            <LeftNav />
            <div className='main'>
                <div className='home-header'>
                    {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                <Thread />
            </div>
        </div>
    )
}
