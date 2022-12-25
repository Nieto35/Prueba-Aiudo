import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBCardFooter,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import InputNumerico from "@components/InputNumerico";
import "@styles/data-cardBank/index.css";

export default function CardRetiro(props) {
  const {
    textFooter,
    iconHeader,
    textButton,
    prestamo,
    cuota,
    datainput,
    setDatainput,
    money,
    consignar,
    retiConsig,
  } = props;

  return (
    <MDBCard alignment="center">
      <MDBCardHeader>
        <div className="d-inline-flex p-2 contentIcon">
          <MDBIcon fas icon={iconHeader} size="lg" />
        </div>
      </MDBCardHeader>

      <MDBCardBody>
        <MDBInputGroup className="mb-3" textBefore="$" textAfter=".00">
          {cuota ? (
            <input
              className="form-control"
              type="text"
              value={cuota}
              ref={refInput}
              disabled
            />
          ) : (
            <InputNumerico datainput={datainput} setDatainput={setDatainput} disabled={consignar ? true : false} />
          )}
        </MDBInputGroup>
        {prestamo && (
          <>
            <MDBInput label="CUOTAS" id="typeNumber" type="number" />
          </>
        )}
        <MDBBtn
          className="mt-3"
          disabled={datainput ? parseInt(datainput) > parseInt(money) : true}
          onClick={retiConsig}
        >
          {textButton}
        </MDBBtn>
      </MDBCardBody>
      <MDBCardFooter className="text-muted">{textFooter}</MDBCardFooter>
    </MDBCard>
  );
}
