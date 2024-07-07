import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import {MockPlayerProvider} from "./test-utils.jsx";
import LoginPage from "../src/pages/authenticationPages/LoginPage.jsx";


describe("LoginPage", () => {
    it("renders the LoginPage", () => {
        render(
            <MemoryRouter>
                <MockPlayerProvider>
                    <LoginPage/>
                </MockPlayerProvider>
            </MemoryRouter>);
        screen.debug();
    });
});