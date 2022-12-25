import React, { useState } from "react";

import CardRetiro from "../CardRetiro";
import TableData from "../table";
import "@styles/dataBank/index.css";

import { fetchTransferMoney } from "@slices/BanksUserSlice";
import CardSelect from "../CardSelect";
import AlertDismissible from "@components/notifications";

export default function Tab2Info(props) {
  const [total, setTotal] = useState("");
  const [consignar, setConsignar] = useState("");
  const [personaje, setPersonaje] = useState("");
  const [paso, setPaso] = useState(1);

  // ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT

  const { money, idBank, dispatch, idUser } = props;

  const transferir = () => {
    if (total !== "") {
      setConsignar(total);
      setPaso(2);
    }
  };

  const selectPersonaje = (id) => {
    if (total !== "") {
      setPersonaje(id);
      setPaso(3);
    }
  };

  const selectCuenta = async (id) => {
    if (id !== "") {
      dispatch(
        fetchTransferMoney({
          cuenta: id.value,
          idUser,
          personaje,
          consignar,
          idBank,
        })
      );
      setTotal("");
      setConsignar("");
      setPersonaje("");
      setTitle("¡TRANSACCION!");
      setTextBody("Todo el Proceso Fue exitoso!");
      setShow(true);
      setPaso(1);
    }
  };

  return (
    <>
      <AlertDismissible
        title={title}
        textBody={textBody}
        show={show}
        setShow={setShow}
      />
      <div className="center">
        {paso === 1 && (
          <div className="contentSpaceBank">
            <div className="contentCard">
              {/* PASO 1  */}
              <CardRetiro
                textFooter="TRANSFERENCIA"
                iconHeader="dollar-sign"
                textButton="TRANSFERIR"
                datainput={total}
                setDatainput={setTotal}
                money={money}
                retiConsig={transferir}
              />
            </div>
          </div>
        )}

        {/* PASO 2 */}
        {paso === 2 && <TableData onClick={selectPersonaje} />}
        {paso === 3 && <CardSelect select={selectCuenta} />}
        {/* PASO 3 */}
        {/*  */}
        {/* <CardSelect /> */}
      </div>
    </>
  );
}
