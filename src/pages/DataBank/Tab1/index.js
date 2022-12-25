import React, { useState, useEffect } from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import { getBankUser } from "@services/bankApi";

import CardBank from "../CardBank";
import CardRetiro from "../CardRetiro";
import "@styles/dataBank/index.css";
import { fetchEditCount } from "@slices/BanksUserSlice";
import AlertDismissible from "@components/notifications";

export default function Tab1Info(props) {
  const [retiro, setRetiro] = useState("");
  const [consignar, setConsignar] = useState("");
  const [balance, setBalance] = useState("+0");
  // ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT
  const { money, idBank, idUser, dispatch } = props;

  useEffect(() => {
    if (retiro) {
      setBalance(`-${retiro}`);
    } else if (consignar) {
      setBalance(`+${consignar}`);
    } else {
      setBalance(`+0`);
    }
  }, [retiro, consignar]);

  const retiConsig = async () => {
    const characters = await getBankUser(idUser);
    if (characters) {
      if (characters.length > 0) {
        const { counts } = characters[0];
        const bank = counts.filter((ele) => ele.id === idBank)[0];
        const otherBanks = counts.filter((ele) => ele.id !== idBank);
        if (retiro) {
          if (parseFloat(bank.money) >= parseFloat(retiro)) {
            const money = parseFloat(bank.money) - parseFloat(retiro);
            bank["money"] = `${money}`;
            const form = {
              counts: [...otherBanks, bank],
            };
            dispatch(fetchEditCount({ idUser, form }));
            setRetiro("");
            setBalance(`+0`);
            setTitle("¡Retiro!");
            setTextBody("Todo el Proceso Fue exitoso!");
            setShow(true);
          } else {
            console.log("Saldo insuficiente");
          }
        } else if (consignar) {
          const money = parseFloat(bank.money) + parseFloat(consignar);
          bank["money"] = `${money}`;
          const form = {
            counts: [...otherBanks, bank],
          };
          dispatch(fetchEditCount({ idUser, form }));
          setConsignar("");
          setBalance(`+0`);
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

  return (
    <>
      <AlertDismissible
        title={title}
        textBody={textBody}
        show={show}
        setShow={setShow}
      />
      <div className="center mt-5">
        <MDBTypography
          tag="h2"
          className="text-success" /*className='text-danger'*/
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
    </>
  );
}
