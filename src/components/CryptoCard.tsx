
import { useEffect, useState } from "react";
import "../css/CryptoCard.css"

export default function CryptoCard(props: any) {
  let crypto = props;
  // console.log(props[0]);
  return (
    <div className="CryptoCard">
      {/* <p className="crypto-symbol">{crypto}</p> */}
    </div>
  );
}
