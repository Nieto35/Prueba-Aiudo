import React, { useState, useEffect } from "react";
// COMPONENTES CON ESTILO
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
// CLOSE COMPONENTES CON ESTILO
// COMPONENTES DE USO GENERAL
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import InfoUser from "@components/InfoUser";
// CLOSE COMPONENTES DE USO GENERAL
// ESTILOS
import "@styles/dataBank/index.css";
// CLOSE ESTILOS
// COMPONENTES DE UNICO USO
import CreditCard from "./Components/BankTarjet";
import Tab1Info from "./Tab1";
import Tab2Info from "./Tab2";
import Tab3Info from "./Tab3";
// CLOSE COMPONENTES DE UNICO USO

// ROUTER DOM 6
import { useParams } from "react-router-dom";
//CLOSE ROUTER DOM 6
// REDUX
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataBank } from "@slices/BanksUserSlice";
// CLOSE REDUX
export default function DataBank() {
  // DATOS TRAIDOS DE REDUX
  const dataBankApi = useSelector((state) => state.dataBank.data, shallowEqual);
  const dispatch = useDispatch();
  // Close DATOS TRAIDOS DE REDUX
  // VARIABLE PARA PASAR DE TABS
  const [fillActive, setFillActive] = useState("tab1");
  // CLOSE VARIABLE PARA PASAR DE TABS

  // SACAR LOS IDS DE LA URL
  // Variable del slug :D
  const { idBank } = useParams();
  // con el split de Js transformamos de strig a arreglo y cada arreglo se forma con la separacion (-)
  const separador = idBank.split("-");
  const idUser = separador[0];
  const idCard = separador[1];
  // CLOSE SACAR LOS IDS DE LA URL
  // _______________________________________________________________________________________________________
  // dataBankApi nos trae todas las tarjetas del usuario, por ende debemos extraer
  // el banco seleccionado por el usuario, con el idCard extraido del slug de la url
  // verificamos que databank llegue como array y si es asi lo filtramos para traer el dato que queremos
  const info = Array.isArray(dataBankApi)
    ? dataBankApi.filter((ele) => ele.id === idCard)[0]
    : {};

  // este useEffect nos trae los datos de los bancos del usuario
  // la logica la puedes ver en los slices
  useEffect(() => {
    dispatch(fetchDataBank(idUser));
  }, []);

  // habfleFillClick es la logica para pasar de un tab a otro
  const handleFillClick = (value) => {
    // verificamos que estamos en el tab que se da click asi no renderizamos sin necesidad
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
        {/* con el (?) verificamos si existe antes de llevarlo al front */}
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
        {/* a cada uno de los tabs se les envia los datos requeridos para su funcionabilidad */}
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
