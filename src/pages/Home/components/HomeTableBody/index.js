import React from "react";

import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
// ROUTER DOM 6
import { NavLink } from "react-router-dom";
// CLOSE ROUTER DOM 6

export default function HomeDataBody(props) {
  const { name, species, image, gender, status, origin, id } = props;
  const ruta = `/private/bankAccount/${id}`;
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={image}
            alt={name}
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{name}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">{species}</p>
        <p className="text-muted mb-0">{gender}</p>
      </td>
      <td>
        <MDBBadge color={status == "Alive" ? "success" : "warning"} pill>
          {status}
        </MDBBadge>
      </td>
      <td>{origin}</td>
      <td>
        <NavLink to={ruta}>
          <MDBBtn>Select</MDBBtn>
        </NavLink>
      </td>
    </tr>
  );
}
