

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./index.css";

export default function Trending(props: any) {
  const trendingList = props.cryptos;
  return (
    <div className="Trending module">
      <p className="module-title">Trending</p>
      {trendingList.map((crypto: any) => {
        return (
          <div key={nanoid()} className="trending-row">
            <p className="">{crypto.item.market_cap_rank}</p>
            <img src={crypto.item.thumb} />
            <p className="">{crypto.item.name}</p>
            <p className="">{crypto.item.symbol}</p>
            <p className="">{crypto.item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
