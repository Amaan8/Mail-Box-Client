import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import Mail from "./Mail";
import Inbox from "./Inbox";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={2} sm={3} className="border p-4 min-vh-100">
          <NavLink to="/home/mail">
            <Button variant="success" className="w-100">
              Compose
            </Button>
          </NavLink>
          <NavLink
            to="/home/inbox"
            className="nav-link text-success text-center border-top mt-3 py-3"
          >
            Inbox
          </NavLink>
        </Col>
        <Col>
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
