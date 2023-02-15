import { useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/email";
import ReadMail from "./ReadMail";
import useHttp from "../hooks/useHttp";

const Inbox = () => {
  const dispatch = useDispatch();
  const [mailState, setMailState] = useState("");
  const email = localStorage.getItem("email");

  const unreadCount = useSelector((state) => state.email.unreadCount);
  let emails = useSelector((state) => state.email.emails);

  const sendRequest = useHttp();

  const showEmail = (mail) => {
    setMailState(mail);

    sendRequest({
      url: `https://mail-box-client-20205-default-rtdb.firebaseio.com/emails/${mail.id}.json`,
      method: "PUT",
      body: {
        ...mail,
        read: true,
      },
    });
    dispatch(emailActions.readed(mail.id));
  };

  const closeEmail = () => {
    setMailState("");
  };

  const deleteMail = (id) => {
    sendRequest({
      url: `https://mail-box-client-20205-default-rtdb.firebaseio.com/emails/${id}.json`,
      method: "DELETE",
    });
  };

  return (
    <>
      {!mailState && (
        <Container className="mb-5">
          <h3>INBOX ({unreadCount})</h3>
          <ListGroup>
            {emails.filter((mail) => mail.receiver === email).length === 0 && (
              <ListGroup.Item className="text-center border-success">
                Empty...
              </ListGroup.Item>
            )}
            {emails
              .filter((mail) => mail.receiver === email)
              .map((mail) => (
                <div key={mail.id} className="d-flex mb-1">
                  <ListGroup.Item
                    className="d-flex align-items-center border-success rounded"
                    action
                    onClick={() => showEmail(mail)}
                  >
                    {!mail.read && (
                      <span className="badge bg-success me-2"> </span>
                    )}
                    {mail.read && <span className="me-4"> </span>}
                    <span>From: {mail.sender}</span>
                    <span className="col text-center ps-2">{mail.subject}</span>
                    <span>{mail.date}</span>
                  </ListGroup.Item>
                  <Button variant="success" onClick={() => deleteMail(mail.id)}>
                    Delete
                  </Button>
                </div>
              ))}
          </ListGroup>
        </Container>
      )}
      {mailState && (
        <ReadMail
          sender={mailState.sender}
          date={mailState.date}
          subject={mailState.subject}
          mailContent={mailState.mailContent}
          closeEmail={closeEmail}
        />
      )}
    </>
  );
};

export default Inbox;
