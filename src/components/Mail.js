import { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const Mail = () => {
  const emailRef = useRef();
  const subjectRef = useRef();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(data);
  }, [editorState]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const sender = localStorage.getItem("email");

    try {
      const response = await fetch(
        "https://mail-box-client-20205-default-rtdb.firebaseio.com/emails.json",
        {
          method: "POST",
          body: JSON.stringify({
            sender: sender,
            receiver: emailRef.current.value,
            subject: subjectRef.current.value,
            mailContent: convertedContent,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container className="border mb-5">
      <Form className="p-3 mb-3" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>To</Form.Label>
          <Form.Control type="email" required ref={emailRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" required ref={subjectRef} />
        </Form.Group>
        <Editor
          editorState={editorState}
          toolbarClassName="border p-1 bg-light"
          wrapperClassName=""
          editorClassName="border p-3 min-vh-100"
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
