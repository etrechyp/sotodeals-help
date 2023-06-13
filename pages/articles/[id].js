import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from '../layout/common/navbar';
import { Container } from '@mui/material';
import LastArticles from '../layout/widgets/lastArticles';

const ArticleViewPage = () => {
  const router = useRouter();
  const [article, setArticle] = useState(null);

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

  const formatHtmlContent = (content) => {
    return { __html: content };
  }

  const handleArticleClick = (id) => {
    console.log('Article clicked:', id);
    fetchArticle(id);
    router.push(`/articles/${id}`);
  }

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchArticle(id);
    }
  }, [router.query]);

  return (
    <div>
      <Navbar />
      <Container>
       <h1>{article ? article.name : '' }</h1>
        {article ? (
          <div>
            <div dangerouslySetInnerHTML={formatHtmlContent(article.content)}></div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
      <LastArticles onArticleClick={handleArticleClick} />
    </div>
  )
}

export default ArticleViewPage;
