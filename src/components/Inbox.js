import { useEffect, useState } from "react";
import { Container, ListGroup, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emailActions } from "../store/email";

const Inbox = () => {
  const dispatch = useDispatch();
  const [inbox, setInbox] = useState("");
  const email = localStorage.getItem("email");

  const unreadCount = useSelector((state) => state.email.unreadCount);
  let emails = useSelector((state) => state.email.emails);
  if (emails == null) {
    emails = {};
  }

  useEffect(() => {
    getMails();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateEmails();
    // eslint-disable-next-line
  }, [emails]);

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

  const updateEmails = async () => {
    try {
      const response = await fetch(
        `https://mail-box-client-20205-default-rtdb.firebaseio.com/emails.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...emails,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };

  const showEmail = (mail) => {
    setInbox(mail);

    dispatch(emailActions.removeCount(mail));
    dispatch(emailActions.readed(mail));
  };

  const closeEmail = (mail) => {
    setInbox("");
  };

  return (
    <>
      {!inbox && (
        <Container className="mb-5">
          <h3>INBOX ({unreadCount})</h3>
          <ListGroup>
            {Object.keys(emails).filter(
              (mail) => emails[mail].receiver === email
            ).length === 0 && (
              <ListGroup.Item className="text-center border-success">
                Empty...
              </ListGroup.Item>
            )}
            {emails &&
              Object.keys(emails)
                .filter((mail) => emails[mail].receiver === email)
                .map((mail) => (
                  <ListGroup.Item
                    key={mail}
                    className="d-flex align-items-center border-success"
                    action
                    onClick={() => showEmail(mail)}
                  >
                    {!emails[mail].read && (
                      <span className="badge bg-success me-2"> </span>
                    )}
                    <span className="col">From: {emails[mail].sender}</span>
                    <span className="col text-center">
                      {emails[mail].subject}
                    </span>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Container>
      )}
      {inbox && (
        <Container>
          <div className="border border-success p-2">
            <span>From: {emails[inbox].sender}</span>
            <CloseButton className="float-end" onClick={closeEmail} />
          </div>
          <div className="py-5">
            <h3 className="border bg-success p-3 text-white">
              {emails[inbox].subject}
            </h3>
            <div
              className="border border-success p-3 min-vh-100"
              dangerouslySetInnerHTML={{ __html: emails[inbox].mailContent }}
            ></div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Inbox;
