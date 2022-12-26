import React, { useEffect, useState } from "react";
// componentes con estilos
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
// close componentes con estilos
// componente de uso unico
import DataBody from "../tableBody";
// close componente de uso unico
// estilos
import "@styles/home/index.css";
// close estilos
// componentes generales
import LogoLoading from "@components/Loading";
// close componentes generales
// REDUX
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataTable } from "@slices/dataTableSlice";
// Close REDUX

export default function TableData(props) {
  // variables Redux
  const dataApiTable = useSelector((state) => state.table.data, shallowEqual);
  const loadingTable = useSelector((state) => state.loadingTable.loading);
  const dispatch = useDispatch();
  // Close variables Redux
  // sacamos variable de props
  const { onClick } = props;
  // count, variable para saber en que pagina de la api se encuentra
  const [count, setCount] = useState(1);

  // detecta si hay un cambio en count y asi vuelve a hacer la consulta
  // a la api y renueva la informacion.
  useEffect(() => {
    dispatch(fetchDataTable(count));
  }, [count]);

  // funcion la cual resta a count verificando si es igual a 1
  const left = () => {
    if (count == 1) {
      console.log("no existe el 0");
    } else {
      setCount(count - 1);
    }
  };

  // funcion que suma a count verificando que no se pase de a 42
  const right = () => {
    if (count == 42) {
      console.log("no existe el 43");
    } else {
      setCount(count + 1);
    }
  };

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
                {/* map con los datos traidos por el Redux */}
                {dataApiTable.map((data) => (
                  <DataBody
                    name={data.name}
                    species={data.species}
                    image={data.image}
                    gender={data.gender}
                    status={data.status}
                    origin={data.origin.name}
                    key={data.id}
                    id={data.id}
                    onClick={onClick}
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
