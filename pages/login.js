import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { 
    Container,
    Alert,
    Snackbar
} from '@mui/material';

const LoginPage = () => {
    const router = useRouter();

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        },
        card: {
            width: '500px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '5px 0',
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#eee',
            borderRadius: '5px',
        },
        button: {
            width: '100%',
            padding: '10px',
            margin: '5px 0',
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '5px',
        },
    };


    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const resp = await axios.post('/api/auth/login', credentials);
            if (resp.status === 200) {
                setSuccess('Login successful');
                router.push('/');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const handleCloseSnackbar = () => {
        setError('');
        setSuccess('');
    };

    return (
        <Container>
            <div style={styles.container}>
                <form style={styles.card} onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        name='email'
                        onChange={handleChange}
                        type='email'
                        placeholder='email'
                    />
                    <input
                        style={styles.input}
                        name='password'
                        onChange={handleChange}
                        type='password'
                        placeholder='password'
                    />
                    <button style={styles.button} type='submit'>
                        Login
                    </button>
                </form>
                <Snackbar open={!!error || !!success} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert severity={error ? 'error' : 'success'} onClose={handleCloseSnackbar}>
                        {error || success}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
};

export default LoginPage;
