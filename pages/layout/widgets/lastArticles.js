import axios from 'axios'
import { useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@mui/material'

export const LastArticles = () => {

    const styles = {
        container: {
            width: '50%',
            margin: 'auto',
            padding: '10px',
            marginTop: '50px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        }
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const getArticles = async () => {
        const resp = await axios.get('/api/articles')
        setArticles(resp.data)
        setLoading(false)
    }

    useEffect(() => {
        getArticles()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Container style={styles.container}>
                <Grid item sx={12} sm={12} lg={12}>
                    <h2>Latest Articles</h2>
                    {articles.map((article) => (
                        <Card key={article.id}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {article.author || 'No author'}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {article.name || 'No name'}
                                </Typography>
                                <Typography variant="body">
                                    {article.content || 'No content'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Read More</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default LastArticles