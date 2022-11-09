import { useEffect, useState } from "react";
import "../css/FearGreed.css";
import styled from "styled-components";



const colorCodes = ["#f00", "#f00", "#ff0", "#f00", "#f00"]

const Percent = styled.p<{ data: number }>`
  color: ${(props: any) =>
    props.data === 0
      ? "var(--clr-fontAccent)"
      : props.data > 0
      ? "var(--clr-gain)"
      : "var(--clr-loss)"};
`;


export default function FearGreed() {
  const [index, setIndex] = useState({ value: "", value_classification: "", timestamp: ""});
  const [history, setHistory] = useState([]);

  const limit = 10;
  const dataFormats = ["json", "csv"]
  const dateFormats = ["", "us", "cn", "kr", "world"];

  const url =
    `https://api.alternative.me/fng/?limit=${limit}&format=${dataFormats[0]}&date_format=${dateFormats[1]}`;

  function getCryptoData() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data);
        setIndex(data.data[0]);
      });

  }
  useEffect(getCryptoData, []);

  return (
    <div className="FearGreed">
      <p className="fg-value">
        <Percent data={index.value}>{index.value}</Percent>
      </p>
      <p className="fg-class">{index.value_classification}</p>
      <p className="fg-time">Last Update: {index.timestamp}</p>
    </div>
  );
}
