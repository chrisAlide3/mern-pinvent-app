import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </CssBaseline>
  );
}

export default App;
