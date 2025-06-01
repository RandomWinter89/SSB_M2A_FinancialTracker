import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const theme = useContext(ThemeContext).theme;
    const className = "button-" + theme;

    function login() {
        const isCorrectUsername = username === "Aaa000@gmail.com";
        const isCorrectPassword = password === "password";
        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken("1234");
            navigate("/home");
        }
    }

    return (
        <Container>
            <h1 className="my-3">Login to your account</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text" data-theme={theme}>
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text" data-theme={theme}>
                        We&apos;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button className={className} onClick={login}>
                    Login
                </Button>
            </Form>
        </Container>
    );
}
