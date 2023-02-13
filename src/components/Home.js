import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailActions } from "../store/email";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import Inbox from "./Inbox";
import Sent from "./Sent";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMails = async () => {
      try {
        const response = await fetch(
          "https://mail-box-client-20205-default-rtdb.firebaseio.com/emails.json"
        );
        const data = await response.json();
        if (!response.ok) {
          let errorMessage = data.error.message;

          throw new Error(errorMessage);
        }
        dispatch(emailActions.setEmails(data));
        dispatch(emailActions.addCount());
      } catch (error) {
        alert(error);
      }
    };
    let id = setInterval(getMails, 2000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg={2} sm={3} className="p-4">
          <Sidebar />
        </Col>
        <Col className="border-start min-vh-100 py-5">
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
