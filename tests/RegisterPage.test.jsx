import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import RegisterPage from "../src/pages/authenticationPages/RegisterPage.jsx";

describe("RegisterPage", () => {
    it("renders the RegisterPage", () => {
        render(<MemoryRouter><RegisterPage/></MemoryRouter>);
        screen.debug();
    });
});