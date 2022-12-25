import React, { useEffect, useState } from "react";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import InfoUser from "@components/InfoUser";
import CreditCard from "./Card";
import "@styles/cardBank/index.css";
// import logoVisa from "@images/bank/visa.svg";
// import logoBbva from "@images/bank/bbva.svg";
// import logoPaypal from "@images/bank/paypal.svg";
import { MDBTypography } from "mdb-react-ui-kit";
// ROUTER DOM 6
import { useParams } from "react-router-dom";
//CLOSE ROUTER DOM 6

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataBank } from "@slices/BanksUserSlice";

export default function BankAccount() {
  const dataBankApi = useSelector((state) => state.dataBank.data, shallowEqual);
  const loading = useSelector((state) => state.loadingBank.loading);
  const dataCharacters = useSelector(
    (state) => state.data.dataCharacter,
    shallowEqual
  );
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDataBank(id));
  }, []);

  return (
    <>
      <NavBar />
      <div className="contentText">
        <InfoUser id={id} />
        <div className="centerText">
          <div>
            <MDBTypography tag="h3" className="mb-0">
              Seleccione su
              <MDBTypography tag="small" className="text-muted">
                {" "}
                Cuenta Bancaria
              </MDBTypography>
            </MDBTypography>
          </div>
        </div>
      </div>
      <div className="contentCreditCard">
        {loading ? (
          <p>cargando...</p>
        ) : (
          dataBankApi.map((data) => (
            <CreditCard
              logo={data.logo}
              money={data.money}
              key={data.id}
              id={data.id}
              idUser={id}
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
}
