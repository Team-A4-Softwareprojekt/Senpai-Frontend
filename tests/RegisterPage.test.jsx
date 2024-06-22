import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import {MemoryRouter} from "react-router-dom";
import LoginPage from "../src/pages/loginAndRegisterPages/LoginPage.jsx";
import RegisterPage from "../src/pages/loginAndRegisterPages/RegisterPage.jsx";

describe("RegisterPage", () => {
    it("renders the RegisterPage", () => {
        render(<MemoryRouter><RegisterPage/></MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });
});