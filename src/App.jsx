import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.jsx";
import LoginPage from "./pages/loginAndRegisterPages/LoginPage.jsx";
import RegisterPage from "./pages/loginAndRegisterPages/RegisterPage.jsx";
import SelectLearningContent from "./pages/selectLearningContent/SelectLearningContent.jsx";
import CodeSenpaiPage from "./pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage.jsx";
import DailyChallengePage from "./pages/dailyChallengePage/DailyChallengePage.jsx";
import NoPage from "./pages/noPage/NoPage.jsx";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/select" element={<SelectLearningContent/>}/>
          <Route path="/select/code" element={<CodeSenpaiPage/>}/>
          <Route path="/account" element={<AccountSettingsPage/>}/>
          <Route path="/select/code/dailyChallenge" element={<DailyChallengePage/>}/>
          <Route path="*" element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
