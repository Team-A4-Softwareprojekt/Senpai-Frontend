import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.js";
import LoginPage from "./pages/loginPage/LoginPage.js";
import NoPage from "./pages/NoPage.js";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

