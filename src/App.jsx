import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./pages/startPage/StartPage.jsx";
import LoginPage from "./pages/authenticationPages/LoginPage.jsx";
import RegisterPage from "./pages/authenticationPages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/authenticationPages/ForgotPasswordPage.jsx";
import SelectPlatformPage from "./pages/selectPlatformPage/SelectPlatformPage.jsx";
import CodeSenpaiPage from "./pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage.jsx";
import DailyChallengeGTPage from "./pages/dailyChallengePage/DailyChallengeGTPage.jsx";
import DailyChallengeMCPage from "./pages/dailyChallengePage/DailyChallengeMCPage.jsx";
import CodeBattlePage from "./pages/codeBattlePage/CodeBattlePage.jsx";
import ManipulationP1Page from './pages/manipulationPage/ManipulationP1Page.jsx';
import ManipulationP2Page from './pages/manipulationPage/ManipulationP2Page.jsx';
import BuzzerPage from './pages/buzzerPage/BuzzerPage.jsx';
import NoPage from "./pages/noPage/NoPage.jsx";
import {PlayerProvider} from './context/playerContext';
import {ScoreProvider} from "./context/scoreContext.jsx";
import {BuzzerQuestionProvider} from "./context/buzzerQuestionContext.jsx";
import {GapTextProvider} from "./context/gapTextQuestionContext.jsx";

function App() {

    return (
        <div>
            <PlayerProvider>
                <GapTextProvider>
                    <ScoreProvider>
                        <BuzzerQuestionProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<StartPage/>}/>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/register" element={<RegisterPage/>}/>
                                    <Route path="/forgotPassword" element={<ForgotPasswordPage/>}/>
                                    <Route path="/select" element={<SelectPlatformPage/>}/>
                                    <Route path="/select/code" element={<CodeSenpaiPage/>}/>
                                    <Route path="/select/code/dailyChallenge/gapText" element={<DailyChallengeGTPage/>}/>
                                    <Route path="/select/code/dailyChallenge/multipleChoice" element={<DailyChallengeMCPage/>}/>
                                    <Route path="/select/code/codeBattle" element={<CodeBattlePage/>}/>
                                    <Route path="/codebattle/buzzer/multiplechoice" element={<BuzzerPage/>}/>
                                    <Route path="/codebattle/manipulation/player1" element={<ManipulationP1Page/>}/>
                                    <Route path="/codebattle/manipulation/player2" element={<ManipulationP2Page/>}/>
                                    <Route path="/account" element={<AccountSettingsPage/>}/>
                                    <Route path="*" element={<NoPage/>}/>
                                </Routes>
                            </BrowserRouter>
                        </BuzzerQuestionProvider>
                    </ScoreProvider>
                </GapTextProvider>
            </PlayerProvider>
        </div>
    );
}

export default App;
