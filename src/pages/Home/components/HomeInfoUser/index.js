import React, { useState, useEffect } from "react";
import "@styles/infoUser/index.css";
import "@styles/home-cardSelect/index.css";
import LogoLoading from "@components/Loading";
import { MDBIcon } from "mdb-react-ui-kit";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataWithDetails } from "@slices/dataUserSlice";
// ROUTER DOM 6
import { NavLink } from "react-router-dom";
// CLOSE ROUTER DOM 6

export default function HomeInfoUser() {
  const dataApi = useSelector((state) => state.data.data, shallowEqual);
  const loading = useSelector((state) => state.loading.loading);
  const dataCharacters = useSelector(
    (state) => state.data.dataCharacter,
    shallowEqual
  );
  const [count, setCount] = useState(1);
  const [ruta, setRuta] = useState(`/private/bankAccount/${count}`);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWithDetails({ data: count, dataCharacters }));
  }, []);

  useEffect(() => {
    dispatch(fetchDataWithDetails({ data: count, dataCharacters }));
    setRuta(`/private/bankAccount/${count}`);
  }, [count]);

  const left = () => {
    if (count == 1) {
      console.log("no existe el 0");
    } else {
      setCount(count - 1);
    }
  };

  const right = () => {
    if (count == 826) {
      console.log("no existe el 827");
    } else {
      setCount(count + 1);
    }
  };

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
