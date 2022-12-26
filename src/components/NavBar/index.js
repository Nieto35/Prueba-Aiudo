import React, { useState } from "react";
// componentes con estilo
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
// Close componentes con estilo

// ROUTER DOM 6
import { NavLink } from "react-router-dom";
// CLOSE ROUTER DOM 6
// Obtener sesion y cerrar sesion de firebase
import { getAuth, signOut } from "firebase/auth";
// Close Obtener sesion y cerrar sesion de firebase

import logo from "@images/logo.png";

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);

  // obtenemos datos de cuenta.
  const auth = getAuth();

  // Funcion para cerrar sesion firebase
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("sesion cerrada");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <img
          src={logo}
          alt="logo"
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <div className="nav-link">
                <NavLink to="/home">Home</NavLink>
              </div>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={logout}>Log out</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <span>
            <MDBIcon fas icon="fa-duotone fa-bell"></MDBIcon>
          </span>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
