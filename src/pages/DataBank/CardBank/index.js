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
import "@styles/data-cardBank/index.css";
import InputNumerico from "@components/InputNumerico";

export default function CardBank(props) {
  const {
    textFooter,
    iconHeader,
    textButton,
    prestamo,
    cuota,
    datainput,
    setDatainput,
    datainputSecond,
    setDatainputSecond,
    retiro,
    retiConsig,
    disabled,
    disableSecondInput,
    enableButton,
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
              disabled
            />
          ) : (
            <InputNumerico
              datainput={datainput}
              setDatainput={setDatainput}
              disabled={disabled ? disabled : retiro ? true : false}
            />
          )}
        </MDBInputGroup>
        {prestamo && (
          <>
            <h6>CUOTAS</h6>
            <InputNumerico
              label="CUOTAS"
              datainput={datainputSecond}
              setDatainput={setDatainputSecond}
              disabled={
                disableSecondInput
                  ? disableSecondInput
                  : disabled
                  ? disabled
                  : retiro
                  ? true
                  : false
              }
            />
          </>
        )}

        <MDBBtn
          className="mt-3"
          disabled={
            enableButton !== undefined
              ? enableButton
              : disabled !== undefined
              ? disabled
              : datainputSecond !== undefined && datainputSecond !== undefined
              ? datainputSecond && datainputSecond
                ? parseInt(datainputSecond) < 1 || parseInt(datainput) < 1
                : true
              : datainput
              ? parseInt(datainput) < 1
              : true
          }
          onClick={retiConsig}
        >
          {textButton}
        </MDBBtn>
      </MDBCardBody>
      <MDBCardFooter className="text-muted">{textFooter}</MDBCardFooter>
    </MDBCard>
  );
}
