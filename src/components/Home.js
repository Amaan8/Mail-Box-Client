import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailActions } from "../store/email";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import Inbox from "./Inbox";
import Sent from "./Sent";
import useHttp from "../hooks/useHttp";

const Home = () => {
  const dispatch = useDispatch();

  const sendRequest = useHttp();

  useEffect(() => {
    const getMails = () => {
      const setMails = (data) => {
        const emails = [];
        for (const mail in data) {
          emails.push({
            id: mail,
            sender: data[mail].sender,
            receiver: data[mail].receiver,
            subject: data[mail].subject,
            mailContent: data[mail].mailContent,
            date: data[mail].date,
            read: data[mail].read,
          });
        }

        dispatch(emailActions.setEmails(emails));
        dispatch(emailActions.addCount());
      };

      sendRequest(
        {
          url: "https://mail-box-client-20205-default-rtdb.firebaseio.com/emails.json",
        },
        setMails
      );
    };

    let id = setInterval(getMails, 1000);
    return () => {
      clearInterval(id);
    };
  }, [sendRequest, dispatch]);

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
