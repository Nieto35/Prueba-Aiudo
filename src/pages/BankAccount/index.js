import React, { useEffect } from "react";
// componentes de uso general
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import InfoUser from "@components/InfoUser";
// close componentes de uso general
// componente de uso unico
import CreditCard from "./Card";
// close componente de uso unico
// estilos
import "@styles/cardBank/index.css";
// close estilos
// componentes con estilo de libreria
import { MDBTypography } from "mdb-react-ui-kit";
// close componentes con estilo de libreria
// ROUTER DOM 6
import { useParams } from "react-router-dom";
//CLOSE ROUTER DOM 6

// REDUX
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// la logica se encuentra en los slices
import { fetchDataBank } from "@slices/BanksUserSlice";
// CLOSE REDUX

export default function BankAccount() {
  // variables de redux
  const dataBankApi = useSelector((state) => state.dataBank.data, shallowEqual);
  const loading = useSelector((state) => state.loadingBank.loading);
  const dispatch = useDispatch();
  // close variables de redux

  // con este useParms obtenemos el slug de la url (lo puedes ver en router)
  // de esta manera obtenemos una variable de la url
  const { id } = useParams();

  // useEffect para hacer la consulta de los bancos antes de cargar la pagina
  // y si no tiene bancos crearlos
  // la logica la encontraras en el slice BankUserSlice
  useEffect(() => {
    dispatch(fetchDataBank(id));
  }, []);

  return (
    <>
      <NavBar />
      <div className="contentText">
        {/* info user recibe el id del usuario para asi traer los datos de la api */}
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
        {/* cada personaje tiene 3 cuentas bancarias, por ende se les hace un map con sus datos */}
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
