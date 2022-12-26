import React, { useState, useEffect } from "react";
// Import de estilos
import "@styles/infoUser/index.css";
import "@styles/home-cardSelect/index.css";
// close Import de estilos

// import de componente general
import LogoLoading from "@components/Loading";
// close import de componente general

// import libreria con estilo
import { MDBIcon } from "mdb-react-ui-kit";
// close import libreria con estilo

// imports de Redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataWithDetails } from "@slices/dataUserSlice";
// close import Redux

// ROUTER DOM 6
import { NavLink } from "react-router-dom";
// CLOSE ROUTER DOM 6

export default function HomeInfoUser() {
  // Variables Redux
  // data obtiene todos los datos de la consulta
  const dataApi = useSelector((state) => state.data.data, shallowEqual);
  //loading es la encargada de saber si la consulta aun esta en curso
  const loading = useSelector((state) => state.loading.loading);
  // dataCharacters lleva un historial de los ya consultados, para no volver a consultarlos
  const dataCharacters = useSelector(
    (state) => state.data.dataCharacter,
    shallowEqual
  );
  // dispatch es una funcion necesaria de redux
  const dispatch = useDispatch();
  // Close Variables Redux

  // count es una variable creada para saber el id del usuario
  const [count, setCount] = useState(1);
  // con la variable ruta vamos organizando la url a la cual se irá la persona si
  // selecciona el usuario
  const [ruta, setRuta] = useState(`/private/bankAccount/${count}`);

  // este useEffect esta pendiente de algun cambio en count
  // si encuentra algun cambio, renueva la consulta con Redux
  // y tambien modifica la url a la cual la persona irá si selecciona un usuario
  useEffect(() => {
    // la logica de traer los datos la encuentras en Slices/dataUserSlice
    dispatch(fetchDataWithDetails({ data: count, dataCharacters }));
    setRuta(`/private/bankAccount/${count}`);
  }, [count]);

  // funcion para modificar count (negativamente).
  const left = () => {
    // no existe un usuario menor a 1 entonces se verifica
    if (count == 1) {
      console.log("no existe el 0");
    } else {
      // si es mayor a uno le permitimos modificar count
      // la cual dispara el useEffect
      setCount(count - 1);
    }
  };

  // funcion para modificar count (positivamente).
  const right = () => {
    // no existe un usuario mayor a 826 entonces se verifica
    if (count == 826) {
      console.log("no existe el 827");
    } else {
      // si es menor a 826 le permitimos modificar count
      // la cual dispara el useEffect
      setCount(count + 1);
    }
  };

  // todos los lugares en el return donde se encuentra el loading
  // verificamos si esta en estado de carga y asi le podemos dar estilo a los momentos de carga
  return (
    <>
      <div className="container py-5 h-100 content-info-user relative">
        <MDBIcon
          fas
          icon="angle-left"
          size="6x"
          className="absolute-left"
          onClick={left}
        />
        <MDBIcon
          fas
          icon="angle-right"
          size="6x"
          className="absolute-right"
          onClick={right}
        />
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5 content-with">
            <div className="card card-style">
              <div className="card-body p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    {loading ? (
                      <div
                        alt="Generic placeholder image"
                        className="img-fluid img-style-loading"
                      >
                        <LogoLoading />
                      </div>
                    ) : (
                      <img
                        src={dataApi.image}
                        alt="Generic placeholder image"
                        className="img-fluid img-style"
                      />
                    )}
                  </div>
                  <div className="flex-grow-1 ms-3 content-center">
                    <div>
                      <h5 className="mb-1">
                        {loading ? "CARGANDO.............." : dataApi.name}
                      </h5>
                      <p className="mb-2 pb-1 p-style">
                        {loading
                          ? "CARGANDO.................."
                          : dataApi.species}
                      </p>
                    </div>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2 div-style">
                      <div>
                        <p className="small text-muted mb-1">
                          {loading ? ".........." : dataApi.gender}
                        </p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">
                          {loading ? ".........." : dataApi.origin.name}
                        </p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">
                          {loading ? "..........." : dataApi.status}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      {/* si selecciona alguno lo mandamos a su ruta */}
                      <NavLink to={ruta}>
                        <button
                          type="button"
                          className="btn btn-primary flex-grow-1"
                        >
                          Select
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
