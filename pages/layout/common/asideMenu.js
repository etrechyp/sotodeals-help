import Link from "next/link";

const AsideMenu = (props) => {
    
    const styles = {
        container: {
            position: 'fixed',
            backgroundColor: '#ddd',
            padding: '20px',
            width: '200px',
            height: '100vh'
        },
        link: {
            color: '#333',
            textDecoration: 'none',
            padding: '0.5rem',
            verticalAlign: 'middle'
            },
        ul: {
            padding: '0',
            margin: '0'
        },
        listItem: {
            listStyleType: 'none',
            margin: '15px',
            cursor: 'pointer'
        }
    };

    return (
        <div style={styles.container}>
        <ul style={styles.ul}>
            <li style={styles.listItem}><Link style={styles.link} href={'/dashboard/create-account'}>Create Account</Link></li>
            <li style={styles.listItem}><Link style={styles.link} href={'/dashboard/post-article'}>Create Article</Link></li>
        </ul>
        </div>
    );
};

export default AsideMenu;
