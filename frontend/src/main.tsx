import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Login } from "./components/Login";
import { ChatView } from "./components/ChatView";
import "./index.css";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  if (!token) return <Login onLogin={setToken} />;
  return <ChatView onLogout={() => { localStorage.removeItem("token"); setToken(null); }} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
