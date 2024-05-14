import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.jsx";
import LoginPage from "./pages/loginAndRegisterPages/LoginPage.jsx";
import RegisterPage from "./pages/loginAndRegisterPages/RegisterPage.jsx";
import SelectLearningContent from "./pages/selectLearningContent/SelectLearningContent.jsx";
import CodeSenpaiPage from "./pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import NoPage from "./pages/noPage/NoPage.jsx";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/selectLearningContent" element={<SelectLearningContent/>}/>
          <Route path="/CodeSenpaiPage" element={<CodeSenpaiPage/>}/>
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
