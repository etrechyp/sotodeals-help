import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import {
    Container,
    Alert,
    Snackbar
} from "@mui/material"

const registerPage = () => {
    const router = useRouter()

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        },
        card: {
            width: "500px",
            padding: "10px",
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
        email: "",
        name: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/api/users", credentials);
            setSuccess("User created successfully");
            
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleCloseSnackbar = () => {
        setError("");
        setSuccess("");
    };

    return (
        <Container style={styles.container}>
            <div style={styles.card}>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button style={styles.button} type="submit">
                        Register
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link href="/login">
                        Login
                    </Link>
                </p>
            </div>
            <Snackbar
                open={!!error || !!success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={error ? "error" : "success"}
                >
                    {error || success}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default registerPage