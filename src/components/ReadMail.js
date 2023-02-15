import { Container, CloseButton } from "react-bootstrap";

const ReadMail = (props) => {
  return (
    <Container>
      <div className="border border-success p-2">
        <span>
          {props.sender ? `From: ${props.sender}` : `To: ${props.receiver}`}
        </span>
        <CloseButton className="float-end" onClick={props.closeEmail} />
        <span className="float-end pe-3">{props.date}</span>
      </div>
      <div className="py-5">
        <h3 className="border bg-success p-3 text-white">{props.subject}</h3>
        <div
          className="border border-success p-3 min-vh-100"
          dangerouslySetInnerHTML={{ __html: props.mailContent }}
        ></div>
      </div>
    </Container>
  );
};

export default ReadMail;
