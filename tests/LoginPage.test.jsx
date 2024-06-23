import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import {MemoryRouter} from "react-router-dom";
import {MockPlayerProvider} from "./test-utils.jsx";
import LoginPage from "../src/pages/loginAndRegisterPages/LoginPage.jsx";


describe("LoginPage", () => {
    it("renders the LoginPage", () => {
        render(
            <MemoryRouter>
                <MockPlayerProvider>
                    <LoginPage/>
                </MockPlayerProvider>
            </MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });
});