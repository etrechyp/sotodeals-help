import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Navbar from "./layout/common/navbar"
import SearchBar from "./layout/widgets/searchBar"
import { 
  Grid,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material"

const SearchPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);

      try {
        const searchTerm = router.query.q;
        const response = await axios.get(`/api/search?q=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
        setError(error);
      }

      setLoading(false);
    };

    if (router.query.q) {
      fetchSearchResults();
    }
  }, [router.query.q]);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div>
      <Navbar />
      <SearchBar />
      <br/>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            sections
          </Link>
          <Typography color="text.primary">search</Typography>
        </Breadcrumbs>
        <br/>
        {loading && <p>Loading...</p>}
        {error && <p>Error en la búsqueda: {error.message}</p>}
        {!loading && !error && searchResults.length === 0 && <p>results dont found</p>}
        {!loading && !error && searchResults.length > 0 && (
          <Grid container spacing={2}>
            {searchResults.map((result) => (
              <Grid item xs={12} key={result._id}>
                <Card sx={{ height: 100 }}>
                  <CardActionArea sx={{ height: 100 }} href={`/articles/${result._id}`}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {result.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stripHtmlTags(result.content).length > 300
                          ? `${stripHtmlTags(result.content).slice(0, 300)}...`
                          : stripHtmlTags(result.content)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  )
}

export default SearchPage;
