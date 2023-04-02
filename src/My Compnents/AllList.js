import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function AllList(props) {
  let buttonText = "Select";
  return (
    <div id="outer">
      <p>Select according to your UID</p>
      <div id="grid">
        {props.user.map((value, index) => {
          return (
            <>
              <div className="gridDiv">
                <p className="nameP">{value.name}</p>
                <p className="uidP">{value.uid}</p>
                <Link to="/authentication">
                  <button
                    onClick={() => {
                      localStorage.setItem("userUid", value.uid);
                      console.log(value.uid);
                    }}
                  >
                    {buttonText}
                  </button>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
