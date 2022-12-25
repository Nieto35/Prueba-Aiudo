import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function AlertDismissible(props) {
  const { title, textBody, show, setShow } = props;

  if (show) {
    return (
      <Alert show={show} variant="success">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{textBody}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me!
          </Button>
        </div>
      </Alert>
    );
  }
}
