import React, {useState} from 'react';
import {Link} from 'react-router-dom'

const App = () => {
    const [room, setRoom] = useState('');

    const joinRoom = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div>
                <h1>Welcome to Grab On Behind</h1>
            </div>
            <div>
                <form>
                    <input
                        type="text"
                        value={room}
                        placeholder={'Enter room ID(optional)'}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button type="submit" onClick={(e) => joinRoom(e)}>
                        {<Link to={'/game'}
                               state={room}> {room !== '' ? `Join Room ${room}` : 'Join Random Room'}</Link>}
                    </button>
                </form>
            </div>
        </>
    );
};

export default App;