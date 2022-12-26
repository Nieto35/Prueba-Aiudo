import React from "react";
// componentes con estilos
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
// Close componentes con estilos
// estilos
import "@styles/data-cardBank/index.css";
// close estilos
// componente global
import InputNumerico from "@components/InputNumerico";
// close componente global

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
          {/* verificamos si el input es de cuota */}
          {cuota ? (
            // si es de cuota desabilitamos el input y mostramos la cuota
            <input
              className="form-control"
              type="text"
              value={cuota}
              disabled
            />
          ) : (
            // si no traemos el input numerico
            // dentro de este verifico si siabled es true
            // si es asi se aplica el desabilitar
            // si no , se verifica que no haya datos en retiro
            // si hay datos en retiro se desabilita si no
            // queda habilitado
            <InputNumerico
              datainput={datainput}
              setDatainput={setDatainput}
              disabled={disabled ? true : retiro ? true : false}
            />
          )}
        </MDBInputGroup>
        {/* si viene la variable prestamo se habilita ell input numero de cuotas */}
        {prestamo && (
          <>
            <h6>NUMERO DE CUOTAS</h6>
            {/* el input verifica ss disableSecondInput es true, si es asi se desabilita,
            si no verifica si disabled es true, si es asi se desabilita, si no
            verifica si hay datos en retiro, si es asi se desabilita, si no queda habilitado */}
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

        {/* se verifica si existe enableButton, si es asi se habilita
        si no se verifica si disabled existe, si es asi  entonces se desabilita
        si no verifica si hay datos en datainputsecond, si detecta texto entonces se desabilita
        sino encuentra texto sigue habilitado.*/}
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
