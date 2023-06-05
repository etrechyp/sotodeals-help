import Navbar from './layout//common/navbar'
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
  return (
    <div>
      <Navbar />
      <SearchBar />
      <br/>
      <Container>
      <Grid style={{textAlign: 'center'}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 360 }}>
          <CardActionArea href='/sections/development'>
            <CardMedia
              component="img"
              height="140"
              image="./developers.jpg"
              alt="developers"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Development
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 360 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="./datalisters.jpg"
              alt="datalisters"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                datalister
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 360 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="./marketing.jpg"
              alt="marketing"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Marketing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 360 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="./support.jpg"
              alt="support"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
      </Grid>
      </Container>
    </div>
  )
}

export default IndexPage