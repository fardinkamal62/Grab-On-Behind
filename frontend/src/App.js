import React, {useEffect, useState} from 'react';
import {bake_cookie, read_cookie} from 'sfcookies';
import {Link} from 'react-router-dom'

const App = () => {
    const [name, setName] = useState(read_cookie('name') || '');
    const [room, setRoom] = useState('');
    const [canJoin, setCanJoin] = useState(false);
    const [buttonText, setButtonText] = useState('Name please');

    const joinRoom = (e) => {
        e.preventDefault();
        if (name === '') return null;
        bake_cookie('name', name);
    };

    useEffect(() => {
        if (name !== '' || name.length === 0) {
            setCanJoin(true)
            setButtonText('Join the game')
        }
        if (name === '' || name.length === 0) {
            setCanJoin(false)
            setButtonText('Name please')
        }
    }, [name]);

    return (
        <>
            <div>
                <h1>Welcome to Grab On Behind</h1>
            </div>
            <div>
                <form>
                    <input
                        type="text"
                        value={name}
                        placeholder={'Enter your name'}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={room}
                        placeholder={'Enter room ID(optional)'}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button type="submit" onClick={(e) => joinRoom(e)}>
                        { canJoin ? <Link to={'/game'} state={room}>Join</Link> : buttonText }
                    </button>
                </form>
            </div>
        </>
    );
};

export default App;