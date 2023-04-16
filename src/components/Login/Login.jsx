import { setLogLevel } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        setSuccess('');
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add some special charecter')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters long');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('User login successful.');
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className='mb-3' name='email' type="email" placeholder="Enter email" required />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='mb-3' name='password' type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p><small>New to this website? please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;