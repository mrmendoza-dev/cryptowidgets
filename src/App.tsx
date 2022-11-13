import { useEffect, useState } from "react";
import "./css/App.css";
import DarkMode from "./components/DarkMode";
import logo from "./assets/logo.png";
import styled from "styled-components";
import Scroller from "./components/Scroller/Scroller";
import CryptoCard from "./components/CryptoCard";
import FearGreed from "./components/FearGreed/FearGreed";
import EthGasTracker from "./components/EthGasTracker/EthGasTracker";
import Converter from "./components/Converter/Converter";


const Percent = styled.p<{ data: number }>`
  color: ${(props: any) =>
    props.data === 0
      ? "var(--clr-fontAccent)"
      : props.data > 0
      ? "var(--clr-gain)"
      : "var(--clr-loss)"};
`;

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [globalData, setGlobalData] = useState({
    active_cryptocurrencies: 0,
    markets: 0,
    market_cap_change_percentage_24h_usd: 0,
    total_market_cap: { usd: 0 },
    total_volume: { usd: 0 },
    market_cap_percentage: { btc: 0, eth: 0 },
  });

  useEffect(getCryptoData, []);
  useEffect(getGlobalData, []);

  const coingeckoUrl = "https://www.coingecko.com/en/coins/";
  const baseUrl = "https://api.coingecko.com/api/v3/";
  const currency = "usd";
  const order = "market_cap_desc";
  const pageNum = "1";
  const perPage = "100";
  const sparkline = "true";
  const pricePercentage = "1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";

  const cryptosUrl = `${baseUrl}coins/markets?vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${String(
    pageNum
  )}&sparkline=${sparkline}&price_change_percentage=${pricePercentage}`;
  const globalUrl = "https://api.coingecko.com/api/v3/global";

  function getCryptoData() {
    fetch(cryptosUrl)
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data);
      });
  }

  function getGlobalData() {
    fetch(globalUrl)
      .then((res) => res.json())
      .then((data) => {
        setGlobalData(data.data);
      });
  }



  return (
    <div className="App">
      <div className="Header">
        <div className="main-header">
          <a href="/">
            <div className="header-title">
              <img src={logo} />
              <p>CryptoWidgets</p>
            </div>
          </a>
          <DarkMode />
        </div>

        <div className="sub-header">
          <p>
            Coins: {Number(globalData.active_cryptocurrencies).toLocaleString()}
          </p>
          <p>Exchanges: {globalData.markets.toLocaleString()}</p>
          <div className="market-change">
            <p>
              Market Cap: $
              {globalData.total_market_cap.usd.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <Percent data={globalData.market_cap_change_percentage_24h_usd}>
              {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
              {globalData.market_cap_change_percentage_24h_usd > 0 ? (
                <i className="fa-solid fa-caret-up"></i>
              ) : (
                <i className="fa-solid fa-caret-down"></i>
              )}
            </Percent>
          </div>

          <p>
            24h Vol: $
            {Number(globalData.total_volume.usd).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="crypto-dominance">
            <p>Dominance:</p>
            <p>BTC {globalData.market_cap_percentage.btc.toFixed(1)}%</p>
            <p>ETH {globalData.market_cap_percentage.eth.toFixed(1)}%</p>
          </div>
        </div>
        {/* <p>Gas: {globalData.active_cryptocurrencies}</p> */}
      </div>

      <div className="Widgets">
        <Scroller cryptos={cryptos} />
        {/* <CryptoCard cryptos={cryptos} /> */}
        <div className="widget-row">
          <FearGreed />
          <EthGasTracker />
        </div>
        <Converter />
      </div>
    </div>
  );
}

export default App;
