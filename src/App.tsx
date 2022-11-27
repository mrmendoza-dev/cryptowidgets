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
import Dominance from "./components/Dominance/Dominance";
import Trending from "./components/Trending/Trending";
import CryptoList from "./components/CryptoList/CryptoList";

import Footer from "./components/Nav/Footer";
import Header from "./components/Nav/Header";

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
    const [trending, setTrending] = useState([]);

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
  const trendingUrl = "https://api.coingecko.com/api/v3/search/trending";


  function getCryptoData() {
    fetch(cryptosUrl)
      .then((res) => res.json())
      .then((data) => {
        setCryptos(data);
      });
    fetch(globalUrl)
      .then((res) => res.json())
      .then((data) => {
        setGlobalData(data.data);
      });
    fetch(trendingUrl)
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.coins);
      });
  }
  useEffect(getCryptoData, []);



  return (
    <div className="App">
      <Header globalData={globalData} title={"CryptoWidgets"} />
      <div className="Widgets">
        <Scroller cryptos={cryptos} />
        <div className="crypto-cards">
          {cryptos.slice(0, 5).map((crypto) => {
            return <CryptoCard crypto={crypto} />;
          })}
        </div>

        <div className="widget-row">
          <FearGreed />
          <EthGasTracker />
        </div>
        <div className="widget-row">
          <Dominance cryptos={globalData.market_cap_percentage} />
          <Trending cryptos={trending} />
        </div>
        <div className="widget-row">
          {/* <CryptoList cryptos={cryptos.slice(0,10)} /> */}
        </div>
        <Converter />
      </div>
      <div className="space"></div>
      <Footer title={"CryptoWidgets"} />
    </div>
  );
}

export default App;
