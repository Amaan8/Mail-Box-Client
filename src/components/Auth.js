import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import useHttp from "../hooks/useHttp";

const Auth = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const sendRequest = useHttp();

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const setAuth = (data) => {
    dispatch(authActions.login(data.idToken));
    localStorage.setItem("token", data.idToken);
    localStorage.setItem("email", data.email);

    history.replace("/home/inbox");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCthslolJCc2T3-kwOkZaUxLS_eGLVeytM";
    } else {
      const confirm = confirmRef.current.value;
      if (password !== confirm) {
        throw new Error("Password did not match");
      }
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCthslolJCc2T3-kwOkZaUxLS_eGLVeytM";
    }

    sendRequest(
      {
        url: url,
        method: "POST",
        body: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      },
      setAuth
    );
  };

  return (
    <Container className="p-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form
            className="border border-success p-3 mb-3"
            onSubmit={submitHandler}
          >
            <h3 className="text-center">{isLogin ? "LOGIN" : "SIGN UP"}</h3>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                className="border-success"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordRef}
                className="border-success"
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={confirmRef}
                  className="border-success"
                />
              </Form.Group>
            )}
            <Button variant="success" type="submit" className="col-4 offset-4">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <Button
            variant="white"
            className="col-8 offset-2 text-success"
            onClick={switchAuth}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Have a account? Login"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
