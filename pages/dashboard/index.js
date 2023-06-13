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
            boxSizing: 'border-box',
            padding: '20px',
            marginLeft: '210px'
        },
        navbar: {
            position: 'sticky',
            top: '0',
            zIndex: '999',
            backgroundColor: '#ffffff',
        },
        contentContainer: {
            paddingLeft: '210px',
        },
    };

    return (
        <div>
            <div style={styles.navbar}>
                <Navbar />
            </div>
            <div style={{ display: 'flex' }}>
                <AsideMenu />

                <div style={styles.contentContainer}>
                    <Container sx={{ marginTop: '20px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h1>Dashboard</h1>
                                <p>Dashboard page content</p>
                                <LastArticles />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Dashboardpage;
