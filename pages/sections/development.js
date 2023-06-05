import React from 'react'
import Navbar from './../layout/common/navbar'
import SearchBar from './../layout/widgets/searchBar'
import lastArticles from './../layout/widgets/lastArticles'
import { Grid } from '@mui/material'


const DevelopmentSectionPage = () => {
    return (
        <div>
            <Navbar />
            <SearchBar />
            <Grid>
                <ul>
                    <li>Article 1</li>
                    <li>Article 2</li>
                    <li>Article 3</li>
                </ul>
            </Grid>
            <lastArticles />
        </div>
    )
}

export default DevelopmentSectionPage