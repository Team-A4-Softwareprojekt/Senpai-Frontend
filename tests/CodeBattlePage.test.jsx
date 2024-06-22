import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import {MemoryRouter} from "react-router-dom";
import CodeBattlePage from "../src/pages/codeBattlePage/CodeBattlePage.jsx";
import {MockBuzzerQuestionProvider, MockPlayerProvider, MockSetManipulationQuestionProvider} from "./test-utils.jsx"; // Pfad anpassen


describe("CodeBattlePage", () => {

    it("renders the CodeBattlePage", () => {
        render(
            <MemoryRouter>
                <MockPlayerProvider>
                    <MockBuzzerQuestionProvider>
                        <MockSetManipulationQuestionProvider>
                            <CodeBattlePage/>
                        </MockSetManipulationQuestionProvider>
                    </MockBuzzerQuestionProvider>
                </MockPlayerProvider>
            </MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });

});
