import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Navbar = ({ logout }) => {
    const router = useRouter();

    const currentPath = router.asPath;
    
    const styles = {
        navbar: {
        display: 'flex',
        padding: '1rem',
        backgroundColor: '#333',
        color: '#fff'
        },
        linkContainer: {
        display: 'flex',
        marginLeft: 'auto'
        },
        link: {
        color: '#fff',
        textDecoration: 'none',
        padding: '0.5rem',
        verticalAlign: 'middle'
        },
        active: {
        fontWeight: 'bold'
        },
        button: {
        marginLeft: '10px',
        backgroundColor: '#eee',
        color: '#333',
        borderRadius: '4px',
        border: 'none',
        padding: '0.5rem',
        cursor: 'pointer'
        },
        branding: {
        display: 'flex',
        alignItems: 'center'
        },
        email: {
            color: '#999',
            fontSize: '15px',
        }

    };

    const [profile, setProfile] = useState({
        name: '',
        email: '',
    });

    const getProfile = async () => {
        const resp = await axios.get('/api/profile')
        setProfile(resp.data)
    }

    useEffect(() => {
        getProfile()
    }, [])

    const handleLogout = async () => {
        try {
        await axios.get('/api/auth/logout');
        router.push('/login');
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div style={styles.navbar}>
        <div style={styles.branding}>
            <Link style={{cursor: 'pointer'}} href={'/dashboard'}><span style={{ marginRight: '1rem', fontWeight: 'bold' }}>{profile.name}</span></Link>
            <span style={styles.email}>{profile.email}</span>
        </div>
        <div style={styles.linkContainer}>
            <Link
            active={styles.active}
            style={currentPath === '/' ? { ...styles.link, ...styles.active } : styles.link}
            href="/"
            >
            Home
            </Link>
            <Link
            active={styles.active}
            style={currentPath === '/dashboard' ? { ...styles.link, ...styles.active } : styles.link}
            href="/dashboard"
            >
            Dashboard
            </Link>
        </div>
        <button style={styles.button} onClick={handleLogout}>
            Logout
        </button>
        </div>
    );
};

export default Navbar;
