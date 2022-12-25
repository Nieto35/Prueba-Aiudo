import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import "@styles/data-cardBank/index.css";

import Select from "react-select";

const options = [
  { value: "1", label: "VISA" },
  { value: "2", label: "BBVA" },
  { value: "3", label: "PAYPAL" },
];

export default function CardSelect(props) {
  const [bank, setBank] = useState("");
  const handleSelectChange = (event) => {
    setBank(event);
  };
  const { select } = props;

  return (
    <MDBCard alignment="center">
      <MDBCardHeader>
        <div className="d-inline-flex p-2 contentIcon">
          <MDBIcon fas icon="hand-holding-usd" size="lg" />
        </div>
      </MDBCardHeader>

      <MDBCardBody>
        <div className="mb-2 ml-2 mr-2 mt-2">
          <Select options={options} onChange={handleSelectChange} />
        </div>
        <MDBBtn onClick={() => select(bank)}>ENVIAR</MDBBtn>
      </MDBCardBody>
      <MDBCardFooter className="text-muted">
        ELIGE LA TARJETA PARA FINALIZAR EL ENVIO
      </MDBCardFooter>
    </MDBCard>
  );
}
