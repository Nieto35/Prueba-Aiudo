import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DataBody from "../tableBody";
import "@styles/home/index.css";
import LogoLoading from "@components/Loading";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataTable } from "@slices/dataTableSlice";

export default function TableData(props) {
  const dataApiTable = useSelector((state) => state.table.data, shallowEqual);
  const loadingTable = useSelector((state) => state.loadingTable.loading);
  const dispatch = useDispatch();
  const { onClick } = props;

  useEffect(() => {
    dispatch(fetchDataTable());
  }, []);

  return (
    <>
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
    </>
  );
}
