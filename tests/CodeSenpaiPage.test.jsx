import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import {MemoryRouter} from "react-router-dom";
import CodeSenpaiPage from "../src/pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import {MockPlayerProvider} from "./test-utils.jsx";


describe("CodeSenpaiPage", () => {
    it("renders the CodeSenpaiPage", () => {
        render(
            <MemoryRouter>
                <MockPlayerProvider>
                    <CodeSenpaiPage/>
                </MockPlayerProvider>
            </MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });
});
