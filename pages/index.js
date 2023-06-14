import axios from 'axios'
import { 
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'
import Navbar from './layout/common/navbar'
import SearchBar from './layout/widgets/searchBar'
import LastArticles from './layout/widgets/lastArticles'
import {
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';


const IndexPage = () => {
  const router = useRouter()

  const [data, setData] = useState([])

  const fetchArticle = async (id) => {
    try {
      const resp = await axios.get(`/api/articles/${id}`);
      if (resp.data && Array.isArray(resp.data)) {
        setArticle(resp.data[0]);
      } else {
        console.error('Invalid response data:', resp.data);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  }

  const handleArticleClick = (id) => {
    fetchArticle(id);
    router.push(`/articles/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/api/sections?pageNumber=1&pageSize=10')
        if (resp.data && Array.isArray(resp.data)) {
          setData(resp.data)
        } else {
          console.error('Invalid response data:', resp.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <SearchBar />
      <br/>
      <Container>
        <Grid style={{textAlign: 'center'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.name}>
              <Card sx={{ maxWidth: 360 }}>
                <CardActionArea href={`/sections/${section.name}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={section.image}
                    alt={section.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {section.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {section.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br/>
        <LastArticles onArticleClick={handleArticleClick} />
      </Container>
    </div>
  )
}

export default IndexPage
