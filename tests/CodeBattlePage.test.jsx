import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import CodeBattlePage from "../src/pages/codeBattlePage/CodeBattlePage.jsx";
import {MockBuzzerQuestionProvider, MockPlayerProvider, MockSetManipulationQuestionProvider} from "./test-utils.jsx";


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
        screen.debug();
    });

});
