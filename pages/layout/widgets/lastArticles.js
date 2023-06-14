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
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    try {
      const resp = await axios.get("/api/articles?pageNumber=1&pageSize=9");
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

  const getSection = async (sectionId) => {
    try {
      const resp = await axios.get(`/api/sections/${sectionId}`);
      if (resp.data && Array.isArray(resp.data)) {
        return resp.data[0];
      } else {
        console.error("Invalid response data:", resp.data);
      }
    } catch (error) {
      console.error("Error fetching section:", error);
    }
    return null;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getArticles();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      const sectionPromises = articles.map((article) => getSection(article.section));
      const resolvedSections = await Promise.all(sectionPromises);
      setSections(resolvedSections);
    };
    fetchSections();
  }, [articles]);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div>
      <Container>
        <h2>Latest Articles</h2>
        <Grid container spacing={2}>
          {articles.map((article, index) => {
            const section = sections[index];
            return (
              <Grid item xs={12} sm={6} md={4} key={article.name}>
                <Card sx={{ height: 220 }}>
                  <CardActionArea sx={{ height: 220 }} onClick={(event) => onArticleClick(article._id)}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {article.name.length > 45
                          ? `${article.name.slice(0, 45)}...`
                          : article.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom color="text.secondary">
                        {formatDate(article.createdAt)}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {section ? section.name : "No Section"}
                      </Typography>
                      <Typography variant="body3">
                        {stripHtmlTags(article.content).length > 200
                          ? `${stripHtmlTags(article.content).slice(0, 200)}...`
                          : stripHtmlTags(article.content)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <br />
      </Container>
    </div>
  );
};

export default LastArticles;
