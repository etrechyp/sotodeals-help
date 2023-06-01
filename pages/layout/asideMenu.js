import Link from "next/link";

const AsideMenu = (props) => {
    
    const styles = {
        container: {
        position: 'fixed',
        backgroundColor: '#f2f2f2',
        padding: '20px',
        width: '200px',
        height: '100vh'
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
            <li style={styles.listItem}><Link href={'/dashboard/create-account'}>Create Account</Link></li>
            <li style={styles.listItem}>Create Blog</li>
            <li style={styles.listItem}>Edit Blog</li>
            <li style={styles.listItem}>Delete Blog</li>
        </ul>
        </div>
    );
};

export default AsideMenu;
