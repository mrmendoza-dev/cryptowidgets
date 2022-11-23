



import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./index.css"

export default function Dominance(props: any) {
  // console.log(props.cryptos);
  let data = props.cryptos;
  let dominanceList = [];
  for (let key in data) {
    dominanceList.push({ id: key, value: data[key] });
  }
  // console.log(dominanceList);

  return (
    <div className="Dominance module">
      <p className="module-title">Dominance</p>
      {/* <p>{props.cryptos.btc}</p> */}
      {/* {props.cryptos ? <p>{props.cryptos}</p> : <></>} */}
      { dominanceList.map((crypto)=> {
        return (
          <div key={nanoid()} className="dominance-row">
            <p className="">{crypto.id}</p>
            <p className="">{crypto.value}</p>
          </div>
        );
      })}
    </div>
  );
}


