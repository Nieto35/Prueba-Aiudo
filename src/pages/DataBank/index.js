import React, { useState, useEffect } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import InfoUser from "@components/InfoUser";

import CreditCard from "./BankTarjet";
import "@styles/dataBank/index.css";

import Tab1Info from "./Tab1";
import Tab2Info from "./Tab2";
import Tab3Info from "./Tab3";

// ROUTER DOM 6
import { useParams } from "react-router-dom";
//CLOSE ROUTER DOM 6

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataBank } from "@slices/BanksUserSlice";

export default function DataBank() {
  const dataBankApi = useSelector((state) => state.dataBank.data, shallowEqual);
  const loading = useSelector((state) => state.loadingBank.loading);
  const dataCharacters = useSelector(
    (state) => state.data.dataCharacter,
    shallowEqual
  );
  const dispatch = useDispatch();
  const [fillActive, setFillActive] = useState("tab1");
  const { idBank } = useParams();
  // SACAR LOS IDS DE LA URL
  const separador = idBank.split("-");
  const idUser = separador[0];
  const idCard = separador[1];
  // CLOSE SACAR LOS IDS DE LA URL
  const info = Array.isArray(dataBankApi)
    ? dataBankApi.filter((ele) => ele.id === idCard)[0]
    : {};

  useEffect(() => {
    dispatch(fetchDataBank(idUser));
  }, []);

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <>
      <NavBar />
      <div className="contentCardData">
        <InfoUser id={idUser} />
        <CreditCard logo={info?.logo} money={info?.money} id={info?.id} />
      </div>
      <MDBTabs fill className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab1")}
            active={fillActive === "tab1"}
          >
            Consignaciones y Retiros
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab2")}
            active={fillActive === "tab2"}
          >
            Transferencia Bancaria
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab3")}
            active={fillActive === "tab3"}
          >
            Prestamos, abonos y pago de cuotas
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={fillActive === "tab1"}>
          <Tab1Info
            money={info?.money}
            idBank={info?.id}
            idUser={idUser}
            dispatch={dispatch}
          />
        </MDBTabsPane>
        <MDBTabsPane show={fillActive === "tab2"}>
          <Tab2Info
            money={info?.money}
            idBank={info?.id}
            idUser={idUser}
            dispatch={dispatch}
          />
        </MDBTabsPane>
        <MDBTabsPane show={fillActive === "tab3"}>
          <Tab3Info
            money={info?.money}
            idBank={info?.id}
            idUser={idUser}
            dispatch={dispatch}
            debt={info?.debt}
            original_debt={info?.original_debt}
            number_quotas_elected={info?.number_quotas_elected}
            original_number_quotas_elected={
              info?.original_number_quotas_elected
            }
            paid_quota={info?.paid_quota}
            weekly_payment={info?.weekly_payment}
          />
        </MDBTabsPane>
      </MDBTabsContent>
      <Footer />
    </>
  );
}
