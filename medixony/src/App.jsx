import "./App.css";
import "./checkIn.css";
import CheckIn from "./checkIn";

function App() {
  const currentPath = window.location.pathname;

  if (currentPath === "/check-in" || currentPath === "/checkin") {
    return <CheckIn />;
  }

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

export default App;