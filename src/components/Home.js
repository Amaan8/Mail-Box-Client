import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { emailActions } from "../store/email";
import Mail from "./Mail";
import Inbox from "./Inbox";
import Sent from "./Sent";

const Home = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector((state) => state.email.unreadCount);

  useEffect(() => {
    dispatch(emailActions.addCount());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg={2} sm={3} className="p-4">
          <NavLink to="/home/mail">
            <Button variant="success" className="w-100">
              Compose
            </Button>
          </NavLink>
          <NavLink to="/home/inbox">
            <Button variant="outline-success" className="mt-4 w-100">
              Inbox ({unreadCount})
            </Button>
          </NavLink>
          <NavLink to="/home/sent">
            <Button variant="outline-success" className="mt-2 w-100">
              Sent
            </Button>
          </NavLink>
        </Col>
        <Col className="border-start min-vh-100">
          <h1 className="p-5 text-center">Welcome to your mail box</h1>
          <Switch>
            <Route path="/home/mail">
              <Mail />
            </Route>
            <Route path="/home/inbox">
              <Inbox />
            </Route>
            <Route path="/home/sent">
              <Sent />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
