// imports de bootsTrap
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
// close // imports de bootsTrap

// estilos
import "@styles/notifications/index.css";

export default function AlertDismissible(props) {
  // sacamos las variables de los props
  const { title, textBody, show, setShow, variant } = props;

  // verificamos si la notificacion esta visible
  if (show) {
    return (
      <Alert show={show} variant={variant} className="absolute-alert">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{textBody}</p>
        <hr />
        <div className="d-flex justify-content-end">
          {/* Con este boton cambiamos el estado de show a false asi desabilita la notificacion */}
          <Button onClick={() => setShow(false)} variant={"outline-" + variant}>
            Close me!
          </Button>
        </div>
      </Alert>
    );
  }
}
