import React, { useEffect, useState } from "react";
import "./App.css";
import AllList from "./My Compnents/AllList";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Authentication from "./My Compnents/Authentication";
import Home from "./My Compnents/Home";
import TeacherPage from "./My Compnents/TeacherPage"

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.employees);
      });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={(props) => <AllList user={user} />} />
          <Route
            path="/authentication"
            Component={(props) => <Authentication user={user} />}
          ></Route>
          <Route
            path="/home"
            Component={(props) => <Home user={user} />}
          ></Route>
          <Route
            path="/teacherPage"
            Component={(props) => <TeacherPage user={user} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
