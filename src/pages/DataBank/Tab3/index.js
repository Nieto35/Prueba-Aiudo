import React, { useState, useEffect } from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import { getBankUser } from "@services/bankApi";
import { fetchEditCount } from "@slices/BanksUserSlice";

import CardBank from "../CardBank";
import AlertDismissible from "@components/notifications";
import "@styles/dataBank/index.css";

export default function Tab3Info(props) {
  const {
    idBank,
    idUser,
    dispatch,
    debt,
    original_debt,
    original_number_quotas_elected,
    paid_quota,
    weekly_payment,
  } = props;
  const [total, setTotal] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [abono, setAbono] = useState("");
  const [deuda, setDeuda] = useState("");
  const [cuotaDeuda, setCuotaDeuda] = useState("");
  // ALERT
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [show, setShow] = useState(false);
  // CLOSE ALERT

  useEffect(() => {
    if (original_debt) {
      setTotal(original_debt);
    }
  }, [original_debt]);

  useEffect(() => {
    if (original_number_quotas_elected) {
      setCuotas(original_number_quotas_elected);
    }
  }, [original_number_quotas_elected]);

  useEffect(() => {
    if (weekly_payment) {
      setDeuda(weekly_payment);
    }
  }, [weekly_payment]);

  useEffect(() => {
    if (paid_quota) {
      setCuotaDeuda(paid_quota);
    }
  }, [paid_quota]);

  const generarDeuda = async () => {
    if (total && cuotas) {
      const characters = await getBankUser(idUser);
      if (characters) {
        if (characters.length > 0) {
          const { counts } = characters[0];
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          const otherBanks = counts.filter((ele) => ele.id !== idBank);

          const money = parseFloat(bank.money) + parseFloat(total);
          const weekly_payment = total / cuotas;

          bank["money"] = `${money}`;
          bank["debt"] = `${total}`;
          bank["original_debt"] = `${total}`;
          bank["number_quotas_elected"] = `${cuotas}`;
          bank["original_number_quotas_elected"] = `${cuotas}`;
          bank["weekly_payment"] = `${weekly_payment}`;

          const form = {
            counts: [...otherBanks, bank],
          };
          dispatch(fetchEditCount({ idUser, form }));
          setTitle("¡ADQUIRISTE UNA DEUDA!");
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

  const abonarDeuda = async () => {
    if (deuda) {
      const characters = await getBankUser(idUser);
      if (characters) {
        if (characters.length > 0) {
          const { counts } = characters[0];
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          const otherBanks = counts.filter((ele) => ele.id !== idBank);

          if (bank.debt !== "0") {
            const money = parseFloat(bank.debt) - parseFloat(abono);
            console.log(money, parseFloat(bank["number_quotas_elected"]));
            const weekly_payment_result = Math.ceil(
              money / parseFloat(bank["number_quotas_elected"])
            );

            if (money === 0) {
              bank["money"] = `${bank["money"] - abono}`;
              bank["debt"] = `0`;
              bank["weekly_payment"] = `0`;
              bank["original_debt"] = `0`;
              bank["number_quotas_elected"] = `0`;
              bank["original_number_quotas_elected"] = `0`;
            } else {
              bank["money"] = `${bank["money"] - abono}`;
              bank["debt"] = `${money}`;
              bank["weekly_payment"] = `${weekly_payment_result}`;
            }

            const form = {
              counts: [...otherBanks, bank],
            };
            dispatch(fetchEditCount({ idUser, form }));
            setTitle("¡ABONASTE A TU DEUDA!");
            setTextBody("Que buen deudor, Todo el Proceso Fue exitoso!");
            setShow(true);
          }
        }
      } else {
        console.log("no se encontro usuario");
      }
    } else {
      console.log("no se encontro usuario");
    }
  };

  const pagarDeuda = async () => {
    if (deuda) {
      const characters = await getBankUser(idUser);
      if (characters) {
        if (characters.length > 0) {
          const { counts } = characters[0];
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          const otherBanks = counts.filter((ele) => ele.id !== idBank);

          if (bank.debt !== "0") {
            const money =
              parseFloat(bank.debt) - parseFloat(bank["weekly_payment"]);
            const number_quotas_elected =
              parseFloat(bank["number_quotas_elected"]) - 1;
            const weekly_payment_result = Math.ceil(
              money / number_quotas_elected
            );

            if (money === 0) {
              bank["money"] = `${bank["money"] - bank["weekly_payment"]}`;
              bank["debt"] = `0`;
              bank["weekly_payment"] = `0`;
              bank["original_debt"] = `0`;
              bank["number_quotas_elected"] = `0`;
              bank["original_number_quotas_elected"] = `0`;
            } else {
              bank["money"] = `${bank["money"] - bank["weekly_payment"]}`;
              bank["debt"] = `${money}`;
              bank["weekly_payment"] = `${weekly_payment_result}`;
              bank["paid_quota"] = `${parseFloat(bank["paid_quota"]) + 1}`;
              bank["number_quotas_elected"] = `${number_quotas_elected}`;
            }

            const form = {
              counts: [...otherBanks, bank],
            };
            dispatch(fetchEditCount({ idUser, form }));
            setTitle("¡PAGASTE UNA CUOTA =D!");
            setTextBody("Todo el Proceso Fue exitoso!");
            setShow(true);
          }
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
        <MDBTypography tag="h2">DEUDA : $ {debt}</MDBTypography>
      </div>
      <div className="center">
        <div className="contentSpaceBank">
          <div className="contentCard">
            <CardBank
              textFooter="PRESTAMO"
              iconHeader="dollar-sign"
              prestamo="true"
              textButton="DEUDA"
              disabled={debt !== "0"}
              datainput={total}
              setDatainput={setTotal}
              datainputSecond={cuotas}
              setDatainputSecond={setCuotas}
              retiConsig={generarDeuda}
            />
          </div>

          <div className="contentCard">
            <CardBank
              textFooter="ABONO"
              iconHeader="hand-holding-usd"
              textButton="ABONAR"
              enableButton={
                debt === "0"
                  ? true
                  : abono
                  ? parseInt(abono) < 1
                    ? true
                    : parseInt(abono) > parseInt(debt)
                  : true
              }
              datainput={abono}
              setDatainput={setAbono}
              retiConsig={abonarDeuda}
            />
          </div>
          <div className="contentCard">
            <CardBank
              textFooter="PAGO DE CUOTA"
              iconHeader="hand-holding-usd"
              textButton="PAGAR"
              prestamo="true"
              datainput={deuda}
              setDatainput={setDeuda}
              disabled
              enableButton={weekly_payment === "0"}
              disableSecondInput
              datainputSecond={cuotaDeuda}
              setDatainputSecond={setCuotaDeuda}
              retiConsig={pagarDeuda}
            />
          </div>
        </div>
      </div>
    </>
  );
}
