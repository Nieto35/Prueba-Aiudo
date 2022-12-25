import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DataBody from "../tableBody";
import "@styles/home/index.css";
import LogoLoading from "@components/Loading";
import { MDBIcon } from "mdb-react-ui-kit";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataTable } from "@slices/dataTableSlice";

export default function TableData(props) {
  const dataApiTable = useSelector((state) => state.table.data, shallowEqual);
  const loadingTable = useSelector((state) => state.loadingTable.loading);
  const dispatch = useDispatch();
  const { onClick } = props;
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchDataTable(count));
  }, [count]);

  const left = () => {
    if (count == 1) {
      console.log("no existe el 0");
    } else {
      setCount(count - 1);
    }
  };

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
