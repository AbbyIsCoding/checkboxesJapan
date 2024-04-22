
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut(auth); 
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        navigate('/LogIn')
    }
    return(
        <div>
            <h1>Welcome to the home page </h1>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default Home 