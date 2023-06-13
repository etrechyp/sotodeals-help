import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography
} from "@mui/material";

const LastArticles = ({ onArticleClick }) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    try {
      const resp = await axios.get("/api/articles?pageNumber=1&pageSize=3");
      if (resp.data && Array.isArray(resp.data)) {
        setArticles(resp.data);
      } else {
        console.error("Invalid response data:", resp.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div>
      <Container>
        <h2>Latest Articles</h2>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article._id}>
              <Card sx={{ height: 200 }}>
                <CardActionArea sx={{ height: 200 }} onClick={(event) => onArticleClick(article._id)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {article.name || "No Name"}
                    </Typography>
                    <Typography variant="body">
                      {stripHtmlTags(article.content).length > 300
                        ? `${stripHtmlTags(article.content).slice(0, 300)}...`
                        : stripHtmlTags(article.content)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default LastArticles;
