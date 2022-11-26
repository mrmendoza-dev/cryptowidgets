import "../css/CryptoCard.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import styled from "styled-components";



function Change(props: any) {
  const Percent = styled.p<{ data: number }>`
    background-color: ${(props: any) =>
      props.data === 0
        ? "var(--clr-fontAccent)"
        : props.data > 0
        ? "var(--clr-gain)"
        : "var(--clr-loss)"};
  `;

  return (
    <Percent className="card-price-change" data={props.value}>
      <div className="Change">
        {props.value > 0 ? (
          <i className="fa-solid fa-caret-up"></i>
        ) : (
          <i className="fa-solid fa-caret-down"></i>
        )}
        {props.value.toFixed(2)}%
      </div>
    </Percent>
  );
}




export default function CryptoCard(props: any) {
  let crypto = props.crypto;
  console.log(crypto);

  return (
    <div className="CryptoCard">
      {/* <p className="crypto-symbol">{crypto}</p> */}
      {crypto ? (
        <div className="card-container">
          <div className="card-main">
            <div className="card-icon">
              <img className="card-img" src={crypto.image} />
              <p className="card-symbol">{crypto.symbol}</p>
            </div>

            <div className="">
              <p className="card-name">{crypto.name}</p>
              <div className="card-market">
                <p className="card-price">
                  $
                  {crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <Change value={crypto.price_change_percentage_24h}></Change>
              </div>
            </div>
          </div>

          <div className="card-sparkline">
            <Sparklines data={crypto.sparkline_in_7d.price} margin={0}>
              <SparklinesLine
                color={
                  crypto.sparkline_in_7d.price[0] >
                  crypto.sparkline_in_7d.price[
                    crypto.sparkline_in_7d.price.length - 1
                  ]
                    ? "var(--clr-loss)"
                    : "var(--clr-gain)"
                }
                style={{ fill: "none", strokeWidth: 3 }}
              />
            </Sparklines>{" "}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
