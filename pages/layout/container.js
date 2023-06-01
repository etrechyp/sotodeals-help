import React from 'react';
import { useRouter } from 'next/router';

const Container = (props) => {
    const router = useRouter();

    const styles = {
        container: {
            padding: '10px',
            marginLeft: router.pathname.startsWith('/dashboard') ? '200px' : '0'
        }
    };

    return (
        <div style={styles.container}>
            {props.children}
        </div>
    );
};

export default Container;
