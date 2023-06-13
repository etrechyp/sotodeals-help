import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,

} from "@mui/material";

const LastArticles = ({ onArticleClick }) => {
  const styles = {
    container: {
      width: "100%",
      margin: "auto",
      padding: "10px",
      marginTop: "50px",
      border: "1px solid #ccc",
      borderRadius: "5px"
    },
    content: {
      maxHeight: "150px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "pre-line"
    }
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    try {
      const resp = await axios.get("/api/articles?pageNumber=1&pageSize=3");
      if (resp.data && Array.isArray(resp.data)) {
        console.log(resp.data);
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
      <Container style={styles.container}>
        <Grid item xs={12} sm={12} lg={12}>
          <h2>Latest Articles</h2>
          {articles.map((article) => (
            <Card style={{ margin: "10px" }} key={article._id}>
                <CardActionArea onClick={(event) => onArticleClick(article._id)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {article.name || "No Name"}
                </Typography>
                <Typography variant="body" style={styles.content}>
                  {stripHtmlTags(article.content).length > 300
                    ? `${stripHtmlTags(article.content).slice(0, 300)}...`
                    : stripHtmlTags(article.content)}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default LastArticles;
