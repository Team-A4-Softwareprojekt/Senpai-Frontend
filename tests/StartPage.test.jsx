import {describe, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import StartPage from '../src/pages/startPage/StartPage';
import {MemoryRouter} from "react-router-dom";

describe("StartPage", () => {
    it("renders the Start page", () => {
        render(<MemoryRouter><StartPage/></MemoryRouter>);
        expect(screen.getByText("Senpai")).toBeInTheDocument();
        expect(screen.getByText("Starte dein Training")).toBeInTheDocument();
        screen.debug();
    });
});