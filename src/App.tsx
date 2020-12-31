import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout(): Promise<void> {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }

  return !isAuthenticating ? (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  ) : (
    <Loading />
  );
}

export default App;
