import React from "react";
import "@styles/card/index.css";
import { MDBBtn } from "mdb-react-ui-kit";
// ROUTER DOM 6
import { NavLink } from "react-router-dom";
//CLOSE ROUTER DOM 6

export default function CreditCard(props) {
  const { logo, money, id, idUser } = props;
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
