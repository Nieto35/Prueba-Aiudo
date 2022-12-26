import React, { useState, useEffect } from "react";
// componente con estilos
import { MDBTypography } from "mdb-react-ui-kit";
// Close componente con estilos
// consulta directa a Json
import { getBankUser } from "@services/bankApi";
// close consulta directa a Json
// logica de Redux
import { fetchEditCount } from "@slices/BanksUserSlice";
// Close logica de Redux
// componente de unico uso
import CardBank from "../Components/CardBank";
// close componente de unico uso
// componente de uso general
import AlertDismissible from "@components/notifications";
// Close componente de uso general
// import de estilos
import "@styles/dataBank/index.css";
// Close import de estilos

export default function Tab3Info(props) {
  // sacamos las props para facil uso
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

  // variables para los inputs
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

  // useEffect que esta pendiente si la deuda
  // cambia y asi hacer set a total que se muestra en pantalla
  // Original debt hace referencia a deuda Original, es decir
  // despues de obtener la deuda, no cambiara su valor
  useEffect(() => {
    if (original_debt) {
      setTotal(original_debt);
    }
  }, [original_debt]);

  // useEffect que esta pendiente si numero de cuotas
  // cambia y asi hacer set a Cuotas que se muestra en pantalla
  // original_number_quotas_elected hace referencia al numero original de cuotas
  // que se eligieron, este valor no cambiara.
  useEffect(() => {
    if (original_number_quotas_elected) {
      setCuotas(original_number_quotas_elected);
    }
  }, [original_number_quotas_elected]);

  // useEffect que esta pendiente de si cambia el pago de la cuota
  // cambia y asi hacer set a Deuda que se muestra en pantalla
  // weekly_payment hace referencia al pago que le corresponde de la cuota.
  // este puede cambiar si la persona abona a su deuda total
  useEffect(() => {
    if (weekly_payment) {
      setDeuda(weekly_payment);
    }
  }, [weekly_payment]);

  // paid_quota es la cantidad de cuotas que lleva pagadas
  // este valor se irá modificando respecto a las cuotas que la persona lleve pagadas
  useEffect(() => {
    if (paid_quota) {
      setCuotaDeuda(paid_quota);
    }
  }, [paid_quota]);

  // Funcion Generar Deuda
  const generarDeuda = async () => {
    // se verifica qie total y la cantidad de cuotas traigan datos.
    if (total && cuotas) {
      // obtenemos los bancos del usuario
      const characters = await getBankUser(idUser);
      // verificamos que lleguen los bancos
      if (characters) {
        if (characters.length > 0) {
          // separamos las cuentas del arreglo
          const { counts } = characters[0];
          // obtenemos la cuenta que nos interesa modificar
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          // separamos las cuentas que no nos interesa modificar
          const otherBanks = counts.filter((ele) => ele.id !== idBank);
          // creamos variable donde sumamos el dinero que se tiene,
          // con la deuda prestada, de esta manera el prestamo se verá reflejado
          const money = parseFloat(bank.money) + parseFloat(total);
          // generamos el pago semanal, dividiendo la cantidad de dinero
          // por el numero de cuotas
          const weekly_payment = total / cuotas;

          // ponemos todos los datos como string en nuestro banco a modificar
          bank["money"] = `${money}`;
          bank["debt"] = `${total}`;
          bank["original_debt"] = `${total}`;
          bank["number_quotas_elected"] = `${cuotas}`;
          bank["original_number_quotas_elected"] = `${cuotas}`;
          bank["weekly_payment"] = `${weekly_payment}`;

          // juntamos el banco ya modificado, con los bancos que no nos
          // interesaba modificar
          const form = {
            counts: [...otherBanks, bank],
          };
          // enviamos los datos de los bancos con el id del usuario a el
          // Slice de Redux para su respectiva logica
          dispatch(fetchEditCount({ idUser, form }));
          // disparamos alerta
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

  // FUNCION ABONAR A LA DEUDA
  const abonarDeuda = async () => {
    // verificamos que exista una deuda
    if (deuda) {
      // obtenemos los bancos del usuario
      const characters = await getBankUser(idUser);
      // verificamos que hayan llegado los bancos del usuario
      if (characters) {
        if (characters.length > 0) {
          // separamos las cuentas del arreglo que nos llega
          const { counts } = characters[0];
          // separamos el banco que nos interesa modificar
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          // separamos los bancos que no nos interesa modificar
          const otherBanks = counts.filter((ele) => ele.id !== idBank);

          // verificamos que este banco si tenga aun pagos por hacer
          if (bank.debt !== "0") {
            // transformamos a variables tipo int, y restamos el abono a
            // la deuda total
            const money = parseFloat(bank.debt) - parseFloat(abono);
            console.log(money, parseFloat(bank["number_quotas_elected"]));
            // generamos de nuevo el pago de cada cuota, debido que el abono se hace
            // a la deuda total
            const weekly_payment_result = Math.ceil(
              money / parseFloat(bank["number_quotas_elected"])
            );
            // Verificamos si con el abono que hizo, abonó la deuda total.
            if (money === 0) {
              // si es asi a dinero le retiramos el abono y
              // todo respecto al prestamo se elimina
              bank["money"] = `${bank["money"] - abono}`;
              bank["debt"] = `0`;
              bank["weekly_payment"] = `0`;
              bank["original_debt"] = `0`;
              bank["number_quotas_elected"] = `0`;
              bank["original_number_quotas_elected"] = `0`;
            } else {
              // si no entonces retira el abono de la cuenta
              // en debt pone la deuda que queda por pagar
              // y en weekly payment la cantidad en la que le quedó su pago por cuota
              bank["money"] = `${bank["money"] - abono}`;
              bank["debt"] = `${money}`;
              bank["weekly_payment"] = `${weekly_payment_result}`;
            }

            // juntamos el banco modificado con los no modificados
            const form = {
              counts: [...otherBanks, bank],
            };
            // enviamos los datos a modificar con la logica de Redux
            dispatch(fetchEditCount({ idUser, form }));
            // disparamos alerta
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

  // Funcion pagar deuda
  const pagarDeuda = async () => {
    // verificamos que exista una deuda
    if (deuda) {
      // obtenemos los datos de los bancos
      const characters = await getBankUser(idUser);
      // verificamos que lleguen los datos de los bancos
      if (characters) {
        if (characters.length > 0) {
          // separamos los bancos del resto de informacion
          const { counts } = characters[0];
          // separamos el banco que no sinteresa modificar
          const bank = counts.filter((ele) => ele.id === idBank)[0];
          // separamos los bancos que no nos interesa modificar
          const otherBanks = counts.filter((ele) => ele.id !== idBank);

          // verificamos que en el banco tengamos deuda
          if (bank.debt !== "0") {
            // convertimos la deuda en numero y le restamos el pago de la cuota
            // tambien convertido en numero
            const money =
              parseFloat(bank.debt) - parseFloat(bank["weekly_payment"]);
            // restamos el numero de cuotas que le queda por pagar
            const number_quotas_elected =
              parseFloat(bank["number_quotas_elected"]) - 1;
            // calcula en cuanto le quedara su pago de cada cuota
            const weekly_payment_result = Math.ceil(
              money / number_quotas_elected
            );

            // verificamos si terminó de pagar la deuda
            if (money === 0) {
              // si la deuda termina entonces le restamos a el dinero de la tarjeta su pago
              // y retiramos toda la informacion de la deuda
              bank["money"] = `${bank["money"] - bank["weekly_payment"]}`;
              bank["debt"] = `0`;
              bank["weekly_payment"] = `0`;
              bank["original_debt"] = `0`;
              bank["number_quotas_elected"] = `0`;
              bank["original_number_quotas_elected"] = `0`;
            } else {
              // si aun no se termina la deuda, restamos el dinero de la deuda,
              // ingresamos la deuda que nos queda en debt
              // ponemos el pago de cada cuota en weekly_payment
              // sumamos 1 a cuotas pagadas
              // y restamos 1 a number_quotas_elected
              bank["money"] = `${bank["money"] - bank["weekly_payment"]}`;
              bank["debt"] = `${money}`;
              bank["weekly_payment"] = `${weekly_payment_result}`;
              bank["paid_quota"] = `${parseFloat(bank["paid_quota"]) + 1}`;
              bank["number_quotas_elected"] = `${number_quotas_elected}`;
            }

            // juntamos el banco modificado con los no modificados
            const form = {
              counts: [...otherBanks, bank],
            };
            // enviamos a la logica del REDUX donde se editara y enviara a json
            dispatch(fetchEditCount({ idUser, form }));
            // disparamos alerta
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
      <div className="relative">
        <AlertDismissible
          title={title}
          textBody={textBody}
          show={show}
          setShow={setShow}
          variant="success"
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
      </div>
    </>
  );
}
