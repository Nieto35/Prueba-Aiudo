import React from "react";

import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";

export default function DataBody(props) {
  // separamos props para facil uso
  const { name, species, image, gender, status, origin, id, onClick } = props;
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
        {/* a traves de este boton se envia el id a Tab 2 */}
        <MDBBtn onClick={() => onClick(id)}>Select</MDBBtn>
      </td>
    </tr>
  );
}
