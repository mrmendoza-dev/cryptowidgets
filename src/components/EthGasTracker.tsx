import { useEffect, useState } from "react";
import "../css/EthGasTracker.css"


export default function EthGasTracker() {

  const [oracle, setOracle] = useState({
    FastGasPrice: "",
    ProposeGasPrice: "",
    SafeGasPrice: "",
    LastBlock: "",
    suggestBaseFee: "",
    gasUsedRatio: "",
  });
  const apiKey = "JF9VSJETPKYG3XE2Y68WIB7BSN5KKFFTWD";
  const url =    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
  // const url = `https://api.etherscan.io/api
  //  ?module=gastracker
  //  &action=gasoracle
  //  &apikey=${apiKey}`;

 
  function getCryptoData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOracle(data.result);
      });
  }
  useEffect(getCryptoData, []);

        console.log(oracle);

  return (
    <div className="EthGasTracker">
      <div className="gas-tier">
        <p className="gas-speed">Fast</p>
        <p className="gas-price">{oracle.FastGasPrice}</p>
      </div>
      <div className="gas-tier">
        <p className="gas-speed">Standard</p>
        <p className="gas-price">{oracle.ProposeGasPrice}</p>
      </div>
      <div className="gas-tier">
        <p className="gas-speed">Safe</p>
        <p className="gas-price">{oracle.SafeGasPrice}</p>
      </div>
      <p className="gas-block">Last Block: {oracle.LastBlock}</p> */

      <p className="">{oracle.suggestBaseFee}</p>
      <p className="">{oracle.gasUsedRatio}</p>
    </div>
  );
}
