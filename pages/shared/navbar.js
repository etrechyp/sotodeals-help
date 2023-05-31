import Link from 'next/link';

export const Navbar = () => {

    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#333',
            color: '#fff'
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            padding: '0.5rem'
        }
    }

    return (
        <div style={styles.navbar}>
            <Link style={styles.link} href="/"><h2>App Name</h2></Link>
            <div>
                <Link style={styles.link} href="/">Home</Link>
                <Link style={styles.link} href="/dashboard">Dashboard</Link>
            </div>
        </div>
    )
}

export default Navbar