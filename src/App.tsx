import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Bar, Pie } from "./dashboard";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "150px" }}>
      <Pie />
      <Bar />
    </div>
  );
}

export default App;
