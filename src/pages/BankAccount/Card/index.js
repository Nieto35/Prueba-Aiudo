import React from "react";
// estilos
import "@styles/card/index.css";
// close estilos
import { MDBBtn } from "mdb-react-ui-kit";
// ROUTER DOM 6
import { NavLink } from "react-router-dom";
//CLOSE ROUTER DOM 6

export default function CreditCard(props) {
  // se reciben las variables, se ponen para un uso de facil manejo
  const { logo, money, id, idUser } = props;

  // generamos una ruta para cada tarjeta, con el id del usuario y el
  // id de la tarjeta, separados de un guion, para asi obetener estos 2 datos
  // en cualquier parte a traves de la url con un split :D
  const ruta = `/private/dataBank/${idUser}-${id}`;
  return (
    <>
      <div className="card bankCard">
        <div className="rectangle"></div>
        <div>
          <img className="card-name" src={logo} />
          <div className="balance">Balance</div>
          <div className="kurs">¥</div>
          <div className="amount">{money}</div>
          {/* mandamos a la url de la tarjeta seleccionada */}
          <NavLink to={ruta}>
            <MDBBtn className="selectCard">Select</MDBBtn>
          </NavLink>
          <div className="siluet-1"></div>
          <div className="siluet-2"></div>
        </div>
      </div>
    </>
  );
}
