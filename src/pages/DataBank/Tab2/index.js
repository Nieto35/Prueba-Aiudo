import React, { useState } from "react";
// componentes de uso unico
import CardRetiro from "../Components/CardRetiro";
import TableData from "../Components/table";
import CardSelect from "../Components/CardSelect";
// Close componente de uso unico
// estilos
import "@styles/dataBank/index.css";
// close estilos

// slice de REDUX
import { fetchTransferMoney } from "@slices/BanksUserSlice";
// close slice de REDUX
// componente de uso general
import AlertDismissible from "@components/notifications";
// Close componente de uso general

export default function Tab2Info(props) {
  // variable para el input
  const [total, setTotal] = useState("");
  // variables para la transaccion
  const [consignar, setConsignar] = useState("");
  const [personaje, setPersonaje] = useState("");

  // Variable para saber en que paso estamos
  const [paso, setPaso] = useState(1);

  // Variables para ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT

  // desestructuramos variables de props para facil uso
  const { money, idBank, dispatch, idUser } = props;

  // funcion transferir manda el valor de total a Consignar
  // y nos manda al paso 2
  const transferir = () => {
    if (total !== "") {
      setConsignar(total);
      setPaso(2);
    }
  };

  // selectPersonaje recibe el id del personae, lo pone en la variable personaje
  // y envia a paso 3
  const selectPersonaje = (id) => {
    if (total !== "") {
      setPersonaje(id);
      setPaso(3);
    }
  };

  // slectCuenta, selecciona la cuenta a la que se envia el dinero
  // renueva a paso 1
  const selectCuenta = async (id) => {
    // verifica que el id exista
    if (id !== "") {
      // envia a Redux los datos, para ver la logica entrar a Slices
      dispatch(
        fetchTransferMoney({
          cuenta: id.value,
          idUser,
          personaje,
          consignar,
          idBank,
        })
      );
      // reseteamos todos los datos
      setTotal("");
      setConsignar("");
      setPersonaje("");
      // Disparamos alerta
      setTitle("¡TRANSACCION!");
      setTextBody("Todo el Proceso Fue exitoso!");
      setShow(true);
      // devolvemos a paso 1
      setPaso(1);
    }
  };

  return (
    <>
      <div className="relative">
        <AlertDismissible
          title={title}
          textBody={textBody}
          show={show}
          setShow={setShow}
          variant="success"
        />
        <div className="center">
          {/* verificamos en que paso se encuentra y mostramos */}
          {paso === 1 && (
            <div className="contentSpaceBank">
              <div className="contentCard">
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
          {paso === 2 && <TableData onClick={selectPersonaje} />}
          {paso === 3 && <CardSelect select={selectCuenta} />}
        </div>
      </div>
    </>
  );
}
