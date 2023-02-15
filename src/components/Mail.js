import { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { emailActions } from "../store/email";
import useHttp from "../hooks/useHttp";

const Mail = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const subjectRef = useRef();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const sendRequest = useHttp();

  useEffect(() => {
    let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(data);
  }, [editorState]);

  const addMail = (mailData, responseData) => {
    const id = responseData.name;
    const mail = { id: id, ...mailData };
    dispatch(emailActions.addEmail(mail));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const sender = localStorage.getItem("email");
    const date = new Date();

    const mailData = {
      sender: sender,
      receiver: emailRef.current.value,
      subject: subjectRef.current.value,
      mailContent: convertedContent,
      date: date.toLocaleDateString(),
      read: false,
    };

    sendRequest(
      {
        url: "https://mail-box-client-20205-default-rtdb.firebaseio.com/emails.json",
        method: "POST",
        body: mailData,
      },
      addMail.bind(null, mailData)
    );
  };

  return (
    <Container className="border border-success mb-5">
      <Form className="p-3 mb-3" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            required
            ref={emailRef}
            className="border-success"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            required
            ref={subjectRef}
            className="border-success"
          />
        </Form.Group>
        <Editor
          editorState={editorState}
          toolbarClassName="border border-success p-1 bg-light"
          wrapperClassName=""
          editorClassName="border border-success p-3 min-vh-100"
          onEditorStateChange={setEditorState}
          toolbar={{
            options: [
              "inline",
              "list",
              "colorPicker",
              "link",
              "emoji",
              "image",
              "history",
            ],
            list: {
              options: ["unordered", "ordered"],
            },
          }}
        />
        <Button variant="success" type="submit" className="col-4 offset-4 mt-3">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default Mail;
