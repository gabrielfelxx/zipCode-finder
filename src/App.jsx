import "./styles.css";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import api from "./request";

function App() {
  const [inputValue, setInputvalue] = useState("");
  const [zipCode, setZipCode] = useState({});

  const goGithub = () => {
    const url = "https://github.com/gabrielfelxx";
    window.open(url, "_blank");
  };

  async function search() {
    if (inputValue === "") {
      console.log("error, nothing was entered!");
      return;
    }
    try {
      const response = await api.get(`${inputValue}/json`);
      setZipCode(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("request failed!");
    }
    setInputvalue("");
  }

  return (
    <>
      <div className="container">
        <h1>ZIP CODE FINDER</h1>

        <div className="search-div">
          <input
            type="text"
            placeholder="Enter zip code"
            value={inputValue}
            onChange={(event) => {
              setInputvalue(event.target.value);
            }}
          />
          <button onClick={search}>
            <FiSearch size={24} color="#eee" />
          </button>
        </div>

        {Object.keys(zipCode).length > 0 && (
          <div className="informations">
            <h2>YOUR ZIP CODE IS: {zipCode.cep}</h2>
            <span>
              street:{" "}
              <span className="main-information">{zipCode.logradouro}</span>
            </span>
            <span>
              neighborhood:{" "}
              <span className="main-information">{zipCode.bairro}</span>
            </span>
            <span>
              city:{" "}
              <span className="main-information">{zipCode.localidade}</span>
            </span>
          </div>
        )}

        <button className="github-icon" onClick={goGithub}>
          <FaGithub size={60} color="#eee" />
        </button>
      </div>
    </>
  );
}

export default App;
