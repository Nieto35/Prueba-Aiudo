import React, { useState, useEffect } from "react";
// componentes con estilos
import { MDBTypography } from "mdb-react-ui-kit";
// close componentes con estilos
// consulta a JSON
import { getBankUser } from "@services/bankApi";
// close consulta a JSON
// Componentes de uso unico
import CardBank from "../Components/CardBank";
import CardRetiro from "../Components/CardRetiro";
// Close Componentes de uso unico
// componente de uso general
import AlertDismissible from "@components/notifications";
// close componente de uso general
// estilos
import "@styles/dataBank/index.css";
// close estilos
// REDUX
import { fetchEditCount } from "@slices/BanksUserSlice";
// CLOSE REDUX

export default function Tab1Info(props) {
  // Variables para retiro y consignacion
  const [retiro, setRetiro] = useState("");
  const [consignar, setConsignar] = useState("");
  const [balance, setBalance] = useState("+0");
  // Close Variables para retiro y consignacion
  // Datos necesarios para ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT
  // sacamos variables de los props para facil uso
  const { money, idBank, idUser, dispatch } = props;

  // useEffect para balance escuchando Retiro y Consignar
  useEffect(() => {
    if (retiro) {
      setBalance(`-${retiro}`);
    } else if (consignar) {
      setBalance(`+${consignar}`);
    } else {
      setBalance(`+0`);
    }
  }, [retiro, consignar]);

  //___________________________________________________________________________________
  // LOGICA DE COMO FUNCIONA EL CONSIGNAR Y RETIRAR
  const retiConsig = async () => {
    // Primero obtenemos los bancos del usuario
    const characters = await getBankUser(idUser);
    // con el if verificamos que si hayan llegado los bancos
    if (characters) {
      // verificamos de nuevo que haya cantidad
      if (characters.length > 0) {
        // con counts extraemos la parte de la consulta que nos interesa, los bancos
        const { counts } = characters[0];
        // en bank filtramos el banco de nuestro interes a modificar
        const bank = counts.filter((ele) => ele.id === idBank)[0];
        // nos llevamos los bancos que no nos interesa modificar en otherBanks
        const otherBanks = counts.filter((ele) => ele.id !== idBank);
        // Vereficamos en cual de las 2 variables escribió el usuario
        if (retiro) {
          // verificamos que el saldo que tiene sea mayor o igual al que desea retirar
          if (parseFloat(bank.money) >= parseFloat(retiro)) {
            // creamos una variable con el saldo que quedará
            const money = parseFloat(bank.money) - parseFloat(retiro);
            // modificamos money del banco  con interes a modificar
            // como string para que no exista problema con el JSON
            bank["money"] = `${money}`;
            // aplicando la inmutabilidad juntamos los bancos sin nuestro interes
            // con el banco modificado en la variable form
            const form = {
              counts: [...otherBanks, bank],
            };
            // aplicamos el editar cuenta con redux (logica en slice)
            dispatch(fetchEditCount({ idUser, form }));
            // volvemos a poner las variable de los inputs en 0
            setRetiro("");
            setBalance(`+0`);
            // disparamos alerta informando que todo salió como se esperaba
            setTitle("¡Retiro!");
            setTextBody("Todo el Proceso Fue exitoso!");
            setShow(true);
          } else {
            // alerta con saldo insuficiente
            // sin embargo no será necesaria debido que
            // tambien tenemos verificacion en los botones
            console.log("Saldo insuficiente");
          }
        } else if (consignar) {
          // si decide consignar dinero
          // convertimos a numero el dinero, lo sumamos a la cantidad que se tiene
          //en el banco
          const money = parseFloat(bank.money) + parseFloat(consignar);
          // modificamos money del banco de nuestro interes guardado como
          // string para que no exista problema con el JSON
          bank["money"] = `${money}`;
          // aplicando la inmutabilidad juntamos los bancos sin nuestro interes
          // con el banco modificado en la variable form
          const form = {
            counts: [...otherBanks, bank],
          };
          // aplicamos el editar cuenta con redux (logica en slice)
          dispatch(fetchEditCount({ idUser, form }));
          // volvemos a poner las variables en 0
          setConsignar("");
          setBalance(`+0`);
          // arrojamos alerta de que todo salió como se esperaba
          setTitle("¡CONSIGNACION!");
          setTextBody("Todo el Proceso Fue exitoso!");
          setShow(true);
        }
      } else {
        console.log("no se encontro usuario");
      }
    } else {
      console.log("no se encontro usuario");
    }
  };
  // CLOSE LOGICA DE COMO FUNCIONA EL CONSIGNAR Y RETIRAR

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
        <div className="center mt-5">
          <MDBTypography
            tag="h2"
            className={retiro > 0 ? "text-danger" : "text-success"}
          >
            $ {balance}
          </MDBTypography>
        </div>
        <div className="center">
          <div className="contentSpaceBank">
            <div className="contentCard">
              <CardBank
                textFooter="CONSIGNAR DINERO"
                iconHeader="dollar-sign"
                textButton="CONSIGNAR"
                datainput={consignar}
                setDatainput={setConsignar}
                retiro={retiro}
                retiConsig={retiConsig}
              />
            </div>
            <div className="contentCard">
              <CardRetiro
                textFooter="RETIRAR DINERO"
                iconHeader="hand-holding-usd"
                textButton="RETIRAR"
                datainput={retiro}
                setDatainput={setRetiro}
                money={money}
                consignar={consignar}
                retiConsig={retiConsig}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
