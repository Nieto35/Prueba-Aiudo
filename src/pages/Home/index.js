import React, { useState } from "react";
// imports de componentes con estilos de libreria
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
// Close imports de componentes con estilos
// Componentes Generales
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
// Close Componentes Generales

// estilos
import "@styles/home/index.css";
// close estilos

// componentes de unico uso para Home
import HomeTableData from "./components/HomeTable";
import HomeInfoUser from "./components/HomeInfoUser";
// close componentes de unico uso para Home

// inicio lass imagenes para que webpack las cree
import logo from "@images/bank/bbva.svg";
import logo1 from "@images/bank/paypal.svg";
import logo2 from "@images/bank/visa.svg";
// close inicio lass imagenes para que webpack las cree

export default function Home() {
  //constante para el cambio entre tabs
  const [fillActive, setFillActive] = useState("tab1");

  //logica para el cambio de tab
  const handleFillClick = (value) => {
    // verifica si está en el activo para no setear sin necesidad
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };
  // close logica para el cambio de tab

  // En este home se brinda dos posibilidades de seleccionar el usuario
  // buscandolo de 1 en 1 (Tab 1)
  // o viendolo en tabla de 20 en 20 (Tab 2)
  return (
    <>
      <NavBar />
      <div className={fillActive == "tab1" ? "content-home" : "content-table"}>
        <MDBTabs fill className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
            >
              CARD
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
            >
              TABLE
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={fillActive === "tab1"}>
            <div className="center">
              <HomeInfoUser />
            </div>
          </MDBTabsPane>
          <MDBTabsPane show={fillActive === "tab2"}>
            <HomeTableData />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
      <Footer />
    </>
  );
}
