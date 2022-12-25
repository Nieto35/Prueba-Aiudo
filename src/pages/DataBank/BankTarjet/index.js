import React from "react";
import "@styles/card/index.css";

export default function CreditCard(props) {
  const { logo, money, id } = props;
  return (
    <>
      <div className="bankCard card">
        <div className="rectangle"></div>
        <div>
          <img className="card-name" src={logo} />
          <div className="balance">Balance</div>
          <div className="kurs">¥</div>
          <div className="amount">{money}</div>
          <div className="siluet-1"></div>
          <div className="siluet-2"></div>
        </div>
      </div>
    </>
  );
}
