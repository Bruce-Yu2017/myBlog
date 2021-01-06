import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ReplyCommentForm = ({ replyTo, handleFormData }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormData(value);
    setValue("");
  };

  return (
    <div className="reply-form">
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        inline
      >
        <Form.Control
          className="reply-form-input"
          placeholder={`Reply to ${replyTo}`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></Form.Control>
        <div className="reply-submit">
          <Button
            type="submit"
            className="reply-submit-btn ml-1"
            disabled={value.trim().length === 0}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ReplyCommentForm;
