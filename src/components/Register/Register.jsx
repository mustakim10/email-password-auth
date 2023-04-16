import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
const [error,setError] = useState('');
const [success,setSuccess] = useState();

const handleSubmit = (event) => {
    //1. prevent page refresh
event.preventDefault();
setSuccess('');
setError('');
//2. collect form data
const email = event.target.email.value;
const password = event.target.password.value ;
console.log(email , password);
// validate
if(!/(?=.*[A-Z])/.test(password)){
    setError('Please add at least one uppercase');
    return ;
}
else if(!/(?=.*[0-9].*[0-9])/.test(password)){
    setError('Please add at least two numbers');
    return;
}
else if(password.length<6){
    setError('Please add at least 6 characters in your password');
    return;
}

//3. create user in firebase
createUserWithEmailAndPassword(auth,email,password)
.then(result => {
    const loggedUser = result.user ;
    console.log(loggedUser);
    setError('');
    event.target.reset();
    setSuccess('User has created successfully');
})
.catch(error => {
    setError(error.message)
    event.target.reset();
    console.error(error.message);
    
})
}

    const handleEmailChange = (event) => {

//setEmail(event.target.value);
}

const handlePasswordBlur = (event) => {
    console.log(event.target.value);
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='your email' required />
                <br />
                <input className='w-50 mb-4 rounded' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='your password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;