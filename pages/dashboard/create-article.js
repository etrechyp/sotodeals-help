import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Navbar from "../layout/navbar";
import AsideMenu from "../layout/asideMenu";
import Container from "../layout/container";
import QuillEditor from "../../utils/quillEditor";

const CreateArticlePage = () => {
    const router = useRouter();

    const styles = {
        card: {
        width: "80%",
        margin: "auto",
        padding: "10px",
        marginTop: "50px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        },
        input: {
        width: "99%",
        padding: "10px",
        margin: "5px",
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "#eee",
        borderRadius: "5px",
        },
        textarea: {
        padding: "10px 5px",
        margin: "10px 0",
        },
        button: {
        width: "99%",
        padding: "10px",
        margin: "5px 0",
        boxSizing: "border-box",
        border: "none",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px",
        },
    };

    const [article, setArticle] = useState({
        name: "",
        category: "",
        content: "",
        author: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({
        ...article,
        [name]: value,
        });
    };

    const handleContentChange = (value) => {
        setArticle({
        ...article,
        content: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(article);

        if (!article.content) {
        console.log(
            "El contenido está vacío. Por favor, ingrese el contenido del artículo."
        );
        return;
        }

        try {
        const res = await axios.post("http://localhost:3000/api/articles", article);
        console.log(res);
        setArticle({
            name: "",
            category: "",
            content: "",
            author: "",
        });
        router.push("/dashboard");
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div>
        <Navbar />
        <AsideMenu />
        <Container>
            <h1>Create Article</h1>
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
                    value={article.category}
                    onChange={handleChange}
                    >
                    <option value="">Select category</option>
                    <option value="development">Development</option>
                    <option value="datalisters">Datalisters</option>
                    <option value="marketing">Marketing</option>
                    <option value="business">Business</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
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
    );
};

export default CreateArticlePage;
