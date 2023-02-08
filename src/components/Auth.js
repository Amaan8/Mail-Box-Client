import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Auth = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
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

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      dispatch(authActions.login(data.idToken));
      localStorage.setItem("token", data.idToken);
      history.replace("/home");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container className="p-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="border p-3 mb-3" onSubmit={submitHandler}>
            <h3 className="text-center">{isLogin ? "LOGIN" : "SIGN UP"}</h3>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" required ref={confirmRef} />
              </Form.Group>
            )}
            <Button variant="info" type="submit" className="col-4 offset-4">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>
          <Button
            variant="secondary"
            className="col-8 offset-2"
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
