import React from "react";
import { MDBFooter, MDBContainer, MDBBtn } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#0a4275" }}
    >
      <MDBContainer className="p-4 pb-0">
        <section className="">
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3">Prueba hecha para</span>
            <MDBBtn type="button" outline color="light" rounded>
              Aiudo
            </MDBBtn>
          </p>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Jairo Felipe Nieto Ruiz - 2022
      </div>
    </MDBFooter>
  );
}
