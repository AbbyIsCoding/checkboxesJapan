import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

import { auth } from '../firebase.config'


const SignUp = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            console.log(userCredential); 
            const user = userCredential.user; 
            localStorage.setItem('token',user.accessToken); 
            localStorage.setItem('user',JSON.stringify(user)); 
            navigate('/'); 
        } catch (error) {
            console.error(error);
            
        }
    }
    return(
        <div>
            <h1>SignUp Page</h1>
            <form onSubmit={handleSubmit} className='signup-form'>
                <input 
                    type='email'
                    placeholder='your email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                <input
                    type='password'
                    placeholder='your password'
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />    
                <button type='submit' className='signup-button'>SignUp</button>    
            </form>
            {/* <p>Need to log in? <Link to='/login'>LogIn</Link></p> */}


        </div>
    )
}

export default SignUp 