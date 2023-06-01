import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../layout/navbar";
import AsideMenu from "../layout/asideMenu";
import Container from "../layout/container";

const CreateAccountPage = () => {
  const router = useRouter();

  const styles = {
    card: {
      width: "50%",
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
      <Navbar />
      <AsideMenu />
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
  );
};

export default CreateAccountPage;
