import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../layout/common/navbar";
import AsideMenu from "../layout/common/asideMenu";
import { Container } from "@mui/material";


const CreateAccountPage = () => {
  const router = useRouter();

  const styles = {
    card: {
      width: "70%",
      margin: "auto",
      padding: "10px",
      marginTop: "50px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "#eee",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      boxSizing: "border-box",
      border: "none",
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "5px",
    },
    dashboardContainer: {
      boxSizing: 'border-box',
      padding: '20px',
      marginLeft: '210px'
    },
    navbar: {
        position: 'sticky',
        top: '0',
        zIndex: '999',
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingLeft: '210px',
    },
  };

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post("/api/users", credentials);
    console.log(credentials)

    if (resp.status === 200) {
      console.log("Account created", resp.data);
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <div style={styles.navbar}>
        <Navbar />
      </div>
      <div style={{ display: 'flex' }}>
      <AsideMenu />
      </div>
      <div style={styles.contentContainer}>
      <Container>
        <h1>Create Account</h1>
        <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" id="name" placeholder="name" name="name" onChange={handleChange} value={credentials.name} /><br/>
          <input style={styles.input} type="email" id="email" placeholder="email" name="email" onChange={handleChange} value={credentials.email} /><br/>
          <input style={styles.input} type="text" id="password" placeholder="password" name="password" onChange={handleChange} value={credentials.password} /><br/>
          <input style={styles.button} type="submit" />
        </form>
        </div>
      </Container>
      </div>
    </div>
  );
};

export default CreateAccountPage;
