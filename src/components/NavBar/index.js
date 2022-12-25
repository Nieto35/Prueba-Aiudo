import React, { useState } from "react";
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
import Notification from "@components/notifications";

// ROUTER DOM 6
import { NavLink } from "react-router-dom";
// CLOSE ROUTER DOM 6

import { getAuth, signOut } from "firebase/auth";

import logo from "@images/logo.png";

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);

  const auth = getAuth();

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
            {/* <Notification /> */}
          </span>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
