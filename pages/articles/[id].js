import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from '../layout/common/navbar';
import LastArticles from '../layout/widgets/lastArticles';
import { 
  Container,
  Link,
  Breadcrumbs,
  Typography
} from '@mui/material';

const ArticleViewPage = () => {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [section, setSection] = useState(null);

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

  const fetchSection = async (id) => {
    try {
      const resp = await axios.get(`/api/sections/${id}`);
      if (resp.data && Array.isArray(resp.data)) {
        setSection(resp.data[0]);
      } else {
        console.error('Invalid response data:', resp.data);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  }


  const formatHtmlContent = (content) => {
    return { __html: content };
  }

  const handleArticleClick = (id) => {
    fetchArticle(id);
    router.push(`/articles/${id}`);
  }

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchArticle(id);
    }
  }, [router.query]);
  
  useEffect(() => {
    if (article) {
      fetchSection(article.section);
    }
  }, [article]);
  

  return (
    <div>
      <Navbar />
      <Container>
      <br/>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          sections
        </Link>
        <Link underline="hover" color="inherit" href={`/sections/${section ? section.name : ''}`}>
          {section ? section.name : ''}
        </Link>
        <Typography color="text.primary">article</Typography>
      </Breadcrumbs>
       <h1>{article ? article.name : '' }</h1>
       {article && (
         <Link href={`/dashboard/post-article/${article._id}`}>Edit</Link>
       )}
        {article ? (
          <div>
            <div dangerouslySetInnerHTML={formatHtmlContent(article.content)}></div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
      <br/>
      <LastArticles onArticleClick={handleArticleClick} />
    </div>
  )
}

export default ArticleViewPage;
