import "./App.css";
import "./checkIn.css";
import CheckIn from "./checkIn";

function Home() {
  return (
    <div className="app">
      <h1>Medixony</h1>
      <p>Understand yourself. Care for yourself.</p>

      <a href="/check-in">
        Start Check-In
      </a>
    </div>
  );
}

function App() {
  const path = window.location.pathname;

  // Check-in page
  if (path === "/check-in" || path === "/checkin") {
    return <CheckIn />;
  }

  // Main page
  return <Home />;
}

export default App;