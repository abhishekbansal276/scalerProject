import React, { useEffect, useState } from "react";
import "../Home.css";
import "../Authentication.css";
import { Link } from "react-router-dom";

export default function TeacherPage() {
  const [takeList, setTake] = useState([]);
  const [listMarks, setListMarks] = useState([]);
  const [marks1, stMarks1] = useState("0");
  const [marks2, stMarks2] = useState("0");
  const [marks3, stMarks3] = useState("0");
  const [marks4, stMarks4] = useState("0");
  const [marks5, stMarks5] = useState("0");
  const [marks6, stMarks6] = useState("0");

  const userUid = localStorage.getItem("userUid");

  async function ReturnStudentList() {
    const res = await fetch("http://localhost:5000/returnStudentList", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let val;
    if (res.status === 200) {
      val = await res.json();
      setTake(val);
    }
  }

  useEffect(() => {
    ReturnStudentList();
  }, []);

  async function addMarks(totalMarks, name) {
    const res = await fetch("http://localhost:5000/updateMarks", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        uid: userUid,
        name: name,
        totalMarks: totalMarks,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let val;
    if (res.status === 200) {
      val = await res.json();
    }
    if (res.status === 300) {
      alert("Can't update now");
    }
  }

  async function getMarks() {
    const res = await fetch("http://localhost:5000/getMarks", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        uid: userUid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let val;
    if (res.status === 200) {
      val = await res.json();
      setListMarks(val);
    }
  }

  async function finalSubmit(name) {
    const res = await fetch("http://localhost:5000/finalSubmit", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        uid: userUid,
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let val;
    if (res.status === 200) {
      val = await res.json();
    }
  }

  return (
    <div className="outer">
      <div id="div1">
        {
          <div id="grid">
            {Object.keys(takeList).map((keys) => {
              return (
                <div className="gridDiv">
                  <p className="stuName1">
                    {takeList[`${keys}`] != "" ? takeList[`${keys}`] : "No one"}
                  </p>
                  <button
                    onClick={() => {
                      let tMarks =
                        parseInt(marks1) +
                        parseInt(marks2) +
                        parseInt(marks3) +
                        parseInt(marks4) +
                        parseInt(marks5) +
                        parseInt(marks6);
                      takeList[`${keys}`] != ""
                        ? addMarks(tMarks, takeList[`${keys}`])
                        : alert("No student assigned here");
                    }}
                  >
                    Assign marks
                  </button>

                  <button
                    onClick={() => {
                      finalSubmit(takeList[`${keys}`]);
                    }}
                  >
                    Final submit
                  </button>
                </div>
              );
            })}
          </div>
        }
        <div>
          <button onClick={getMarks}>Show marks</button>

          <div id="grid">
            {listMarks.map((keys) => {
              return (
                <div className="gridDiv">
                  <p className="stuName1">{keys.name}</p>
                  <p className="stuName1">Total marks - {keys.marks}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div id="div2">
        <div className="container">
          <p>Give marks on parameters</p>
          <p>
            And click on assign marks of perticular student to whom you want to
            assign marks
          </p>
          <form>
            <input
              type="number"
              placeholder="Timeframe ..."
              value={marks1}
              onChange={(e) => stMarks1(e.target.value)}
            />
            <input
              type="number"
              placeholder="Budget ..."
              value={marks2}
              onChange={(e) => stMarks2(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quality ..."
              value={marks3}
              onChange={(e) => stMarks3(e.target.value)}
            />
            <input
              type="number"
              placeholder="Scope ..."
              value={marks4}
              onChange={(e) => stMarks4(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stakeholder satisfaction ..."
              value={marks5}
              onChange={(e) => stMarks5(e.target.value)}
            />
            <input
              type="number"
              placeholder="Sustainability ..."
              value={marks6}
              onChange={(e) => stMarks6(e.target.value)}
            />
            <br />
          </form>
        </div>
        <div className="outer">
          <div id="div1">
            <button
              onClick={() => {
                getMarks();
                console.log("Inside btn 1 ", listMarks);
              }}
            >
              Final marks students
            </button>
            <div id="grid">
              {listMarks.map((keys, index) => {
                if(keys.finalOrNot == 1){
                    return (
                        <div className="gridDiv">
                          <p className="stuName1">{keys.name}</p>
                        </div>
                      );
                }
              })}
            </div>
          </div>

          <div id="div2">
            <button
              onClick={() => {
                getMarks();
                console.log("Inside btn 1 ", listMarks);
              }}
            >
              Not final marks students
            </button>
            <div id="grid">
              {listMarks.map((keys, index) => {
                if(keys.finalOrNot == 0){
                    return (
                        <div className="gridDiv">
                          <p className="stuName1">{keys.name}</p>
                        </div>
                      );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
