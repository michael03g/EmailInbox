import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Email from "./Email";
import Generate from "./Generate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/emails" element={<Email />} />
          <Route path="/generate" element={<Generate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
