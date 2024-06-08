import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Email from "./Email";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="emails" element={<Email />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
