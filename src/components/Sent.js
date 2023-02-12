import { useEffect, useState } from "react";
import { Container, ListGroup, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/email";

const Inbox = () => {
  const dispatch = useDispatch();
  const [sentMails, setSentMails] = useState("");
  const email = localStorage.getItem("email");

  let emails = useSelector((state) => state.email.emails);
  if (emails == null) {
    emails = {};
  }

  useEffect(() => {
    getMails();
    // eslint-disable-next-line
  }, []);

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
    } catch (error) {
      alert(error);
    }
  };

  const showEmail = (mail) => {
    setSentMails(mail);
  };

  const closeEmail = () => {
    setSentMails("");
  };

  return (
    <>
      {!sentMails && (
        <Container className="mb-5">
          <h3>SENT</h3>
          <ListGroup>
            {Object.keys(emails).filter((mail) => emails[mail].sender === email)
              .length === 0 && (
              <ListGroup.Item className="text-center border-success">
                Empty...
              </ListGroup.Item>
            )}
            {emails &&
              Object.keys(emails)
                .filter((mail) => emails[mail].sender === email)
                .map((mail) => (
                  <ListGroup.Item
                    key={mail}
                    className="d-flex align-items-center border-success"
                    action
                    onClick={() => showEmail(mail)}
                  >
                    <span>To: {emails[mail].receiver}</span>
                    <span className="col text-center ps-2">
                      {emails[mail].subject}
                    </span>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Container>
      )}
      {sentMails && (
        <Container>
          <div className="border border-success p-2">
            <span>To: {emails[sentMails].receiver}</span>
            <CloseButton className="float-end" onClick={closeEmail} />
          </div>
          <div className="py-5">
            <h3 className="border bg-success p-3 text-white">
              {emails[sentMails].subject}
            </h3>
            <div
              className="border border-success p-3 min-vh-100"
              dangerouslySetInnerHTML={{
                __html: emails[sentMails].mailContent,
              }}
            ></div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Inbox;
