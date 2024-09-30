import "./App.css";
import { ChartBar, Pie } from "./chartjs-dashboards";
import { D3Bar } from "./d3-dashboard";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1>D3.js</h1>
        <D3Bar />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Chart.js</h1>
        <Pie />
        <ChartBar />
      </div>
    </div>
  );
}

export default App;
