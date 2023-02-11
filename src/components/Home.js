import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Mail from "./Mail";
import Inbox from "./Inbox";

const Home = () => {
  const unreadCount = useSelector((state) => state.email.unreadCount);

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
        </Col>
        <Col className="border-start min-vh-100">
          <h1 className="p-5 text-center">Welcome to your mail box</h1>
          <Switch>
            <Route path="/home/inbox">
              <Inbox />
            </Route>
            <Route path="/home/mail">
              <Mail />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
