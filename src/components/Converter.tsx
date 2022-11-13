
import { useEffect, useState } from "react";
import "../css/Converter.css";

export default function Converter() {

  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(1);

  const [baseCurrency, setBaseCurrency] = useState("USD")
  const [targetCurrency, setTargetCurrency] = useState("BTC");

  let forexCurrencies: any = [
    { name: "United States Dollar", symbol: "USD" }
  ];
  let cryptocurrencies: any = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Cardano", symbol: "ADA" },
  ];
  const currencies = [...forexCurrencies, ...cryptocurrencies];

  const [formData, setFormData] = useState({
    quantity: 1,
    base: "USD",
    target: "BTC",
  });

  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    calculateResults();



  }

  useEffect(()=> {
    setQuantity(formData.quantity);
    setBaseCurrency(formData.base);
    setTargetCurrency(formData.target);
  }, [formData])

  function handleSubmit(event: any) {
    event.preventDefault();
    // submitToApi(formData)
    console.log(formData);
  }

  function swapCurrencies() {
    let newBase = formData.target;
    let newTarget = formData.base;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        base: newBase,
        target: newTarget,
      };
    });
  }
  function calculateResults() {
    setResult(100);
  };

  return (
    <div className="Converter">
      <p className="module-title">Cryptocurrency Converter</p>
      <div className="">
        <div className="converter-form">
          <input
            type="number"
            className="form-quantity"
            placeholder="1"
            onChange={handleChange}
            name="quantity"
            value={formData.quantity}
          />

          <select
            className="form-select"
            onChange={handleChange}
            name="base"
            value={formData.base}
          >
            {currencies.map((currency) => (
              <option value={currency.symbol}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>

          <button className="btn-swap" onClick={swapCurrencies}>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>

          <select
            className="form-select"
            onChange={handleChange}
            name="target"
            value={formData.target}
          >
            {currencies.map((currency) => (
              <option value={currency.symbol}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="results">
          <p className="">
            {quantity} ({baseCurrency})
          </p>
          <p>=</p>
          <p className="">
            <span className="result">{result}</span> ({targetCurrency})
          </p>
        </div>
      </div>
    </div>
  );
}
