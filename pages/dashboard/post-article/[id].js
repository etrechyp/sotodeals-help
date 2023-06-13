import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../layout/common/navbar";
import AsideMenu from "../../layout/common/asideMenu";
import QuillEditor from "../../../utils/quillEditor";
import { Container } from "@mui/material";

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const styles = {
    card: {
        width: "90%",
        margin: "auto",
        padding: "10px",
        marginTop: "50px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    input: {
        width: "99%",
        padding: "10px",
        margin: "5px",
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "#eee",
        borderRadius: "5px"
    },
    textarea: {
        padding: "10px 5px",
        margin: "10px 0"
    },
    button: {
        width: "99%",
        padding: "10px",
        margin: "5px 0",
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px"
    },
    dashboardContainer: {
        boxSizing: "border-box",
        padding: "20px",
        marginLeft: "210px"
    },
    navbar: {
        position: "sticky",
        top: "0",
        zIndex: "999",
        backgroundColor: "#ffffff"
    },
    contentContainer: {
        paddingLeft: "210px"
    }
};

  const [article, setArticle] = useState({
    name: "",
    section: "",
    content: ""
  });

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/sections?pageNumber=1&pageSize=100"
        );
        setSections(response.data);
      } catch (error) {
        console.log("Error fetching sections:", error);
      }
    };

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/articles/${id}`
        );
        const fetchedArticle = response.data;
        console.log(fetchedArticle[0]);
        setArticle(fetchedArticle[0]);
      } catch (error) {
        console.log("Error fetching article:", error);
      }
    };

    fetchSections();
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value
    });
  };

  const handleContentChange = (value) => {
    setArticle({
      ...article,
      content: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!article.content) {
      console.log("El contenido está vacío. Por favor, ingrese el contenido del artículo.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:3000/api/articles/${id}`, article);
      console.log(res);
      setArticle({
        name: "",
        section: "",
        content: "",
        updatedAt: Date.now()
      });
      router.push(`/articles/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <div style={{ display: "flex" }}>
        <AsideMenu />
        </div>
        <div style={styles.contentContainer}>
          <Container>
            <h1>Edit Article</h1>
            <div style={styles.card}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  name="name"
                  style={styles.input}
                  onChange={handleChange}
                  value={article.name}
                />
                <br />
                <select
                  id="category"
                  name="category"
                  style={styles.input}
                  value={article.section}
                  onChange={handleChange}
                >
                  {sections.map((section) => (
                    <option key={section._id} value={section._id}>
                      {section.name}
                    </option>
                  ))}
                </select>
                <br />
                <div style={styles.textarea}>
                  <QuillEditor
                    value={article.content}
                    onChange={handleContentChange}
                  />
                </div>
                <br />
                <input type="submit" value="Submit" style={styles.button} />
              </form>
            </div>
          </Container>
        </div>
      </div>

  );
};

export default EditArticlePage;
