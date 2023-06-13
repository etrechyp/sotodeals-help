import axios from 'axios'
import { 
  useEffect,
  useState
} from 'react'
import Navbar from './layout/common/navbar'
import SearchBar from './layout/widgets/searchBar'
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
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading data: {error.message}</div>
  

  return (
    <div>
      <Navbar />
      <SearchBar />
      <br/>
      <Container>
        <Grid style={{textAlign: 'center'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section._id}>
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
      </Container>
    </div>
  )
}

export default IndexPage
