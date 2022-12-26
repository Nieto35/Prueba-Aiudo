import React, { useEffect, useState } from "react";
// import de componentes con estilos de libreria
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
// close import de componentes con estilos de libreria
// import de componente solo necesario para home
import HomeDataBody from "../HomeTableBody";
// close import de componente solo necesario para home
// estilos
import "@styles/home/index.css";
// close estilos
// componente de uso general
import LogoLoading from "@components/Loading";
// close componente de uso general

// REDUX
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataTable } from "@slices/dataTableSlice";
// CLOSE REDUX

export default function HomeTableData() {
  // Variables necesarias para Redux
  const dataApiTable = useSelector((state) => state.table.data, shallowEqual);
  const loadingTable = useSelector((state) => state.loadingTable.loading);
  const dispatch = useDispatch();
  // Close Variables necesarias para Redux

  // variable count para saber en que pagina esta el usuario
  const [count, setCount] = useState(1);

  // useEffect pendiente de algun cambio en count para hacer una nueva consulta con REDUX
  useEffect(() => {
    dispatch(fetchDataTable(count));
  }, [count]);

  // funcion para modificar count (negativamente).
  const left = () => {
    // no existe una tabla menor a 1 entonces se verifica
    if (count == 1) {
      console.log("no existe el 0");
    } else {
      // si es mayor a uno le permitimos modificar count
      // la cual dispara el useEffect
      setCount(count - 1);
    }
  };

  // funcion para modificar count (positivamente).
  const right = () => {
    // no existe una tabla mayor a 42 entonces se verifica
    if (count == 42) {
      console.log("no existe el 43");
    } else {
      // si es menor a 826 le permitimos modificar count
      // la cual dispara el useEffect
      setCount(count + 1);
    }
  };

  // todos los lugares en el return donde se encuentra el loading
  // verificamos si esta en estado de carga y asi le podemos dar estilo a los momentos de carga
  return (
    <div className="relative">
      <MDBIcon
        fas
        icon="angle-left"
        size="6x"
        className="absolute-left-table"
        onClick={left}
      />
      <MDBIcon
        fas
        icon="angle-right"
        size="6x"
        className="absolute-right-table"
        onClick={right}
      />

      {loadingTable ? (
        <LogoLoading />
      ) : (
        <div className="content">
          <div className="contentTable container-sm">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Position</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {/* como recibimos un arreglo de 20 usuarios les hacemos un map para mostrarlos 1x1 */}
                {dataApiTable.map((data) => (
                  <HomeDataBody
                    name={data.name}
                    species={data.species}
                    image={data.image}
                    gender={data.gender}
                    status={data.status}
                    origin={data.origin.name}
                    key={data.id}
                    id={data.id}
                  />
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      )}
    </div>
  );
}
