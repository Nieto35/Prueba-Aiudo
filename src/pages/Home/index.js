import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import "@styles/home/index.css";
import HomeTableData from "./components/HomeTable";
import HomeInfoUser from "./components/HomeInfoUser";
import logo from "@images/bank/bbva.svg";
import logo1 from "@images/bank/paypal.svg";
import logo2 from "@images/bank/visa.svg";

export default function Home() {
  const [fillActive, setFillActive] = useState("tab1");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
  return (
    <>
      <NavBar />
      <div className={fillActive == "tab1" ? "content-home" : "content-table"}>
        <MDBTabs fill className="mb-3">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleFillClick("tab1")}
              active={fillActive === "tab1"}
            >
              CARD
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleFillClick("tab2")}
              active={fillActive === "tab2"}
            >
              TABLE
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={fillActive === "tab1"}>
            <div className="center">
              <HomeInfoUser />
            </div>
          </MDBTabsPane>
          <MDBTabsPane show={fillActive === "tab2"}>
            <HomeTableData />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
      <Footer />
    </>
  );
}
