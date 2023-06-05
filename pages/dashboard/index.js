import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../layout/common/navbar';
import AsideMenu from '../layout/common/asideMenu';
import LastArticles from '../layout/widgets/lastArticles';
import {
    Container,
    Grid
} from '@mui/material';

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
            right : '0',
            boxSizing : 'border-box',
            padding: '20px',
            marginLeft: '210px'
        }
    };

    return (
        <div>
            <Navbar />


            <AsideMenu />


            <Container style={styles.dashboardContainer}>
                <Grid>
                    <h1>Dashboard</h1>
                    <p>Dashboard page content</p>
                </Grid>
                <Grid>
                    <LastArticles />
                </Grid>
            </Container>
        </div>
    );
};

export default Dashboardpage;
