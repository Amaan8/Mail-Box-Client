import { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReadMail from "./ReadMail";

const Inbox = () => {
  const [mailState, setMailState] = useState("");
  const email = localStorage.getItem("email");

  let emails = useSelector((state) => state.email.emails);

  const showEmail = (mail) => {
    setMailState(mail);
  };

  const closeEmail = () => {
    setMailState("");
  };

  return (
    <>
      {!mailState && (
        <Container className="mb-5">
          <h3>SENT</h3>
          <ListGroup>
            {emails.filter((mail) => mail.sender === email).length === 0 && (
              <ListGroup.Item className="text-center border-success">
                Empty...
              </ListGroup.Item>
            )}
            {emails
              .filter((mail) => mail.sender === email)
              .map((mail) => (
                <ListGroup.Item
                  key={mail.id}
                  className="d-flex align-items-center border-success"
                  action
                  onClick={() => showEmail(mail)}
                >
                  <span>To: {mail.receiver}</span>
                  <span className="col text-center ps-2">{mail.subject}</span>
                  <span>{mail.date}</span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Container>
      )}
      {mailState && (
        <ReadMail
          receiver={mailState.receiver}
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
