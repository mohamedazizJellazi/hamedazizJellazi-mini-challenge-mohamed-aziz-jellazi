import "./App.css";
import Header from "./assets/header";
import Content from "./assets/content";
import React, { useState } from "react";
import ErrorBoundary from "./components/errorbounday";
function App() {
  const [body, setBody] = useState("body");
  return (
    <div className="App">
      <ErrorBoundary>
        <Header body={body} setBody={(w) => setBody(w)} />
      </ErrorBoundary>
      <ErrorBoundary>
        <Content body={body} />
      </ErrorBoundary>
    </div>
  );
} // l'interface de app

export default App;
