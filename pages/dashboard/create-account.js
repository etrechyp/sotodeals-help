import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../layout/common/navbar";
import AsideMenu from "../layout/common/asideMenu";
import { Container, Alert, Snackbar } from "@mui/material";


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
    confirmPassword: "",
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setAlertMessage("Passwords do not match");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    if (
      credentials.name.trim() === "" ||
      credentials.email.trim() === "" ||
      credentials.password.trim() === "" ||
      credentials.confirmPassword.trim() === ""
    ) {
      setAlertMessage("Please fill in all fields");
      setAlertSeverity("error");
      setOpenAlert(true);
      return;
    }

    try {
      const resp = await axios.post("/api/users", credentials);

      if (resp.status === 201) {
        console.log("Account created", resp.data);
        setCredentials({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setAlertMessage("Account created successfully");
        setAlertSeverity("success");
        setOpenAlert(true);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlertMessage("User already exists");
      } else {
        setAlertMessage("Error creating account");
      }
      setAlertSeverity("error");
      setOpenAlert(true);
    }
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
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
              <input
                style={styles.input}
                type="text"
                id="name"
                placeholder="name"
                name="name"
                onChange={handleChange}
                value={credentials.name}
              /><br/>
              <input
                style={styles.input}
                type="email"
                id="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={credentials.email}
              /><br/>
              <input
                style={styles.input}
                type="password"
                id="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={credentials.password}
              /><br/>
              <input
                style={styles.input}
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                name="confirmPassword"
                onChange={handleChange}
                value={credentials.confirmPassword}
              /><br/>
              <input style={styles.button} type="submit" />
            </form>
          </div>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </div>
  );
};

export default CreateAccountPage;
