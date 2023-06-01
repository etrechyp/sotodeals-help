import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../layout/navbar';
import Container from '../layout/container';
import AsideMenu from '../layout/asideMenu';

const Dashboardpage = () => {
    const router = useRouter();

    const styles = {
        buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        },
        dashboardContainer: {
            position : 'fixed',
            top : '0',
            right : '0',
            width : '80%',
            boxSizing : 'border-box'
        }

    };

    

    return (
        <div>
            <Navbar />
            <AsideMenu />
            <Container style={styles.dashboardContainer}>
                <h1>Dashboard</h1>
            </Container>
        </div>
    );
};

export default Dashboardpage;
