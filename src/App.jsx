import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.jsx";
import LoginPage from "./pages/loginAndRegisterPages/LoginPage.jsx";
import RegisterPage from "./pages/loginAndRegisterPages/RegisterPage.jsx";
import SelectLearningContent from "./pages/selectLearningContent/SelectLearningContent.jsx";
import CodeSenpaiPage from "./pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage.jsx";
import DailyChallengeGTPage from "./pages/dailyChallenge/DailyChallengeGTPage.jsx";
import DailyChallengeMCPage from "./pages/dailyChallenge/DailyChallengeMCPage.jsx";
import CodeBattlePage from "./pages/codeBattlePage/CodeBattlePage.jsx";
import ManipulationP1Page from './pages/manipulationPage/ManipulationP1Page.jsx';
import ManipulationP2Page from './pages/manipulationPage/ManipulationP2Page.jsx';
import MultipleChoicePage from './pages/multipleChoicePage/MultipleChoicePage.jsx';
import GapTextPage from './pages/buzzerPage/gapTextPage/GapTextPage.jsx';
import NoPage from "./pages/noPage/NoPage.jsx";
import { PlayerProvider } from './context/playerContext';
import {BuzzerQuestionProvider} from "./context/buzzerQuestionContext.jsx";

function App() {

    return (
        <div>
            <PlayerProvider>           
                <BuzzerQuestionProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/select" element={<SelectLearningContent />} />
                            <Route path="/select/code" element={<CodeSenpaiPage />} />
                            <Route path="/select/code/dailyChallenge/gapText" element={<DailyChallengeGTPage/>}/>
                            <Route path="/select/code/dailyChallenge/multipleChoice" element={<DailyChallengeMCPage/>}/>
                            <Route path="/select/code/codeBattle" element={<CodeBattlePage />} />
                            <Route path="/codebattle/buzzer/multiplechoice" element={<MultipleChoicePage />} />
                            <Route path="/codebattle/buzzer/gaptext" element={<GapTextPage />} />
                            <Route path="/codebattle/manipulation/player1" element={<ManipulationP1Page />} />
                            <Route path="/codebattle/manipulation/player2" element={<ManipulationP2Page />} />
                            <Route path="/account" element={<AccountSettingsPage />} />
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </BrowserRouter>
                </BuzzerQuestionProvider>
            </PlayerProvider>
        </div>
    );
}

export default App;
