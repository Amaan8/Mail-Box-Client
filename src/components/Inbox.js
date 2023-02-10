import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";

const Inbox = () => {
  const [emails, setEmails] = useState({});
  const email = localStorage.getItem("email");

  useEffect(() => {
    getMails();
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
      console.log(data);
      setEmails(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container className="mb-5">
      <h3>INBOX</h3>
      <ListGroup>
        {Object.keys(emails).filter((mail) => emails[mail].receiver === email)
          .length === 0 && (
          <ListGroup.Item className="text-center">Empty...</ListGroup.Item>
        )}
        {emails &&
          Object.keys(emails)
            .filter((mail) => emails[mail].receiver === email)
            .map((mail) => (
              <ListGroup.Item key={emails[mail]} className="row">
                <span className="col">From: {emails[mail].sender}</span>
                <span className="col offset-1">
                  Subject: {emails[mail].subject}
                </span>
                {/* <span
                  className="col"
                  dangerouslySetInnerHTML={{ __html: emails[mail].mailContent }}
                ></span> */}
              </ListGroup.Item>
            ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;
