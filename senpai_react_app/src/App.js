import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.js";
import LoginPage from "./pages/loginAndRegisterPages/LoginPage.js";
import RegisterPage from "./pages/loginAndRegisterPages/RegisterPage.js";
import NoPage from "./pages/noPage/NoPage.js";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

