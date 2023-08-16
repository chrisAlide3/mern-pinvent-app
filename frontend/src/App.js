import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home/Home";
import { Container } from "@mui/material";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <CssBaseline>
      <Container sx={{}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetpassword/:resetToken" element={<Reset />} />
            <Route path="/cockpit" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CssBaseline>
  );
}

export default App;
