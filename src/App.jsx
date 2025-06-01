import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "./Contexts/AuthContext";
import { TransactionContext } from "./Contexts/TransactionContext";
import { ThemeContext } from "./Contexts/ThemeContext";
import { useContext } from "react";

import RequireAuth from "./Components/RequireAuth";
import useLocalStorage from "use-local-storage";

import "./App.css";

import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddTransaction from "./Pages/AddTransaction";

function Layout() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const currentTheme = useContext(ThemeContext).theme;
  const setTheme = useContext(ThemeContext).setTheme;
  const updateTheme = currentTheme === "light" ? "dark" : "light";
  const className = "button-" + currentTheme;

  function Logout() {
    if (authContext.token === null) return;
    authContext.setToken(null);
    navigate("/");
  }

  return (
    <>
      <Navbar bg={currentTheme} variant={currentTheme}>
        <Container>
          <Navbar.Brand href="/">Budget Tracker</Navbar.Brand>
          <Nav>
            {authContext.token !== null && (
              <Nav.Link href="/home">Home</Nav.Link>
            )}
            {authContext.token === null && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {authContext.token !== null && (
              <Nav.Link href="/AddTransaction">Add Transaction</Nav.Link>
            )}
            {authContext.token !== null && (
              <button className= {className} onClick={Logout}>
                Logout
              </button>
            )}
            <button className = {className} onClick={() => setTheme(updateTheme)}>Toggle Theme</button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [token, setToken] = useLocalStorage("token", null);
  const [transaction, setTransaction] = useLocalStorage("transaction", []);

  return (
    <div className="Application" data-theme = {theme}>
      <AuthContext.Provider value={{ token, setToken }}>
        <TransactionContext.Provider value={{ transaction, setTransaction }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <BrowserRouter>
              <Routes>
                {/**
            <Route path = "/" element = {<Layout />}> */}
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="login" element={<Login />} />
                  <Route
                    path="home"
                    element={
                      <RequireAuth>
                        <Home />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="addTransaction"
                    element={
                      <RequireAuth>
                        <AddTransaction />
                      </RequireAuth>
                    }
                  />
                </Route>
                {/** </Route> */}
              </Routes>
            </BrowserRouter>
          </ThemeContext.Provider>
        </TransactionContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}
