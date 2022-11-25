

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
            <p className="trending-rank">{crypto.item.market_cap_rank}</p>
            <img className="trending-logo" src={crypto.item.thumb} />
            <a href={`https://www.coingecko.com/en/coins/${crypto.item.id}`} target="_blank">
              <p className="trending-name">{crypto.item.name}</p>
            </a>
            <p className="trending-symbol">{crypto.item.symbol}</p>
            {/* <p className="trending-row">{crypto.item.value}</p> */}
          </div>
        );
      })}

    </div>
  );
}
