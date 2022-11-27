
import { useEffect, useState } from "react";
import "./index.css";
import { nanoid } from "nanoid";

export default function Converter(props: any) {

  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState({id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 16000})
  const [targetCurrency, setTargetCurrency] = useState({id: "ethereum", name: "Ethereum", symbol: "ETH", price: 1200});


  const currencies = props.cryptos.map((crypto: any)=> {
    return { id: crypto.id, name: crypto.name, symbol: crypto.symbol.toUpperCase(), price: crypto.current_price };
  });

  const [formData, setFormData] = useState({
    quantity: 1,
    base: baseCurrency.id,
    target: targetCurrency.id,
  });


  function handleChange(event: any) {
    const { name, value } = event.target;
    console.log(value);
    // console.log(baseCurrency);
    // console.log(targetCurrency);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    calculateResults();

  }

  function findCrypto(id: any, cryptoList: any) {
    cryptoList=props.cryptos;
    return cryptoList.find((crypto: any)=> {
      return crypto.id ===id;
    });

  }

  useEffect(()=> {
    setQuantity(formData.quantity);
    // setBaseCurrency(findCrypto(props.cryptos, formData.base));
    // setTargetCurrency(findCrypto(props.cryptos, formData.target));
    console.log(findCrypto(props.cryptos, formData.target));
  }, [formData])

  function handleSubmit(event: any) {
    event.preventDefault();
    // submitToApi(formData)
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
            {currencies.map((currency: any) => (
              <option key={nanoid()} value={currency.id}>
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
            {currencies.map((currency: any) => (
              <option key={nanoid()} value={currency.id}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="results">
          <p className="">
            {quantity} {baseCurrency.name} ({baseCurrency.symbol})
          </p>
          <p>=</p>
          <p className="">
            <span className="result">{result}</span> {targetCurrency.name} (
            {targetCurrency.symbol})
          </p>
        </div>
      </div>
    </div>
  );
}
