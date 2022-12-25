import React, { useEffect } from "react";
import "@styles/infoUser/index.css";
import LogoLoading from "@components/Loading";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchDataWithDetails } from "@slices/dataUserSlice";

export default function InfoUser(props) {
  const { id } = props;
  const dataApi = useSelector((state) => state.data.data, shallowEqual);
  const loading = useSelector((state) => state.loading.loading);
  const dataCharacters = useSelector(
    (state) => state.data.dataCharacter,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataWithDetails({ data: id, dataCharacters }));
  }, []);

  return (
    <div className="container py-5 h-100 content-info-user">
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
                      {loading ? "CARGANDO.................." : dataApi.species}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
