import React, { useEffect, useState } from "react";
import "../Home.css";
import { Link } from "react-router-dom";

export default function Home(props) {
  const userUid = localStorage.getItem("userUid");

  const [totalStudentsHave, setTotalStudentsHave] = useState("");
  const [takeList, setTake] = useState([]);

  useEffect(() => {
    props.user.forEach((item) => {
      if (item.uid === userUid) {
        setTotalStudentsHave(item.totalStudents);
      }
    });
  }, "");

  const [students, setStudent] = useState([]);

  useEffect(() => {
    fetch("/student")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStudent(data.student);
      });
  }, []);

  async function UpdateStudentCountTeacher() {
    const res = await fetch("http://localhost:5000/updateStudentCountTeacher", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      const val = await res.json();
      setTotalStudentsHave(val.toStu);
    }
  }

  async function UpdateStudentCountTeacherAfterRemove() {
    const res = await fetch(
      "http://localhost:5000/updateStudentCountTeacherAfterRemove",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ uid: userUid }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 201) {
      const val = await res.json();
      setTotalStudentsHave(val.toStu);
    }
  }

  async function AddStudentToTeacher(name) {
    const res = await fetch("http://localhost:5000/addStudentToTeacher", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid, stuName: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const val = await res.json();
      SetStudentList(name);
    }
  }

  async function RemoveStudentToTeacher(name) {
    const res = await fetch("http://localhost:5000/removeStudentToTeacher", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid, stuName: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const val = await res.json();
      RemoveFromStudentList(name);
    }
  }

  async function RemoveFromStudentList(name) {
    const res = await fetch("http://localhost:5000/removeFromStudentList", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid, name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const val = await res.json();
      UpdateStudentToZero(name);
      UpdateStudentCountTeacherAfterRemove();
    }
  }

  async function SetStudentList(name) {
    const res = await fetch("http://localhost:5000/setStudentList", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ uid: userUid, name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const val = await res.json();
    }
  }

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

  async function UpdateStudentToOne(name) {
    const res = await fetch("http://localhost:5000/updateStudent", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const val = await res.json();
      setStudent(val.student);
    }
  }

  async function UpdateStudentToZero(name) {
    const res = await fetch("http://localhost:5000/updateStudentToZero", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name: name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const val = await res.json();
      setStudent(val.student);
    }
  }

  return (
    <div className="outer">
      <div id="div1">
        <p className="stuName1">Select alteast 3 and maximum 4 students</p>
        <br />
        <p id="noStudentP">All students are assigned</p>
        <div id="grid">
          {students.map((value, index) => {
            if (value.assigned == 0) {
              document.getElementById("noStudentP").style.display = "none";
              return (
                <div className="gridDiv">
                  <p className="nameP">{value.name}</p>
                  <button
                    onClick={() => {
                      if (parseInt(totalStudentsHave) < 4) {
                        UpdateStudentToOne(value.name);
                        UpdateStudentCountTeacher();
                        AddStudentToTeacher(value.name);
                      } else {
                        alert("Can't add more");
                      }
                    }}
                  >
                    Take
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div id="div2">
      <p className="stuName1">List of students assigned to you</p>
        <button
          onClick={() => {
            ReturnStudentList();
          }}
        >
          Update
        </button>
        <p className="stuName1">Click on update button to update</p>
        <br />
        <div>
          {
            <div id="grid">
              {Object.keys(takeList).map((keys) => {
                return (
                  <div className="gridDiv">
                    <p className="stuName1">
                      {takeList[`${keys}`] != ""
                        ? takeList[`${keys}`]
                        : "No one"}
                    </p>
                    <button
                      onClick={() => {
                        takeList[`${keys}`] != ""
                          ? RemoveStudentToTeacher(takeList[`${keys}`])
                          : alert("No student assigent");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          }
        </div>
        <br />
        {totalStudentsHave>=3?<Link to={"/teacherPage"}>
          <button type="button" id="nextbtn">Next</button>
        </Link>:<div/>}
      </div>
    </div>
  );
}
