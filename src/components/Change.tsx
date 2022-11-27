
import "../css/CryptoCard.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import styled from "styled-components";

export default function Change(props: any) {
  const Percent = styled.p<{ data: number }>`
    background-color: ${(props: any) =>
      props.data === 0
        ? "var(--clr-fontAccent)"
        : props.data > 0
        ? "var(--clr-gain)"
        : "var(--clr-loss)"};
  `;

  return (
    <div className="Change">
      <Percent className="card-price-change" data={props.value}>
        {props.value > 0 ? (
          <i className="fa-solid fa-caret-up"></i>
        ) : (
          <i className="fa-solid fa-caret-down"></i>
        )}
        {props.value.toFixed(2)}%
      </Percent>
    </div>
  );
}

