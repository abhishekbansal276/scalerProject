import React, { useState, useEffect } from "react";
import "../Authentication.css";
import { Link } from "react-router-dom";

export default function Authentication(props) {
  const [pin, setPin] = useState("");
  const userUid_1 = localStorage.getItem("userUid");

  let userPin = null;

  props.user.forEach((item) => {
    if (item.uid === userUid_1) {
      userPin = item.pin;
    }
  });

  return (
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="Enter your pin"
          value={pin}
          id="inputPin"
          onChange={(e) => setPin(e.target.value)}
        />
        <br />
        <button
          type="button"
          id="submitBtn"
          onClick={() => {
            if (pin === userPin) {
              alert("Looks Good");
              {
                document.getElementById("inputPin").style.display = "none";
              }
              {
                document.getElementById("submitBtn").style.display = "none";
              }
              {
                document.getElementById("nextPage").style.visibility =
                  "visible";
              }
            } else {
              alert("Opps!");
            }
          }}
        >
          Submit
        </button>
        <p>Password hint - 1234</p>
        <br />
        <Link to={"/home"}>
          <button type="button" id="nextPage">
            Next
          </button>
        </Link>
      </form>
    </div>
  );
}
