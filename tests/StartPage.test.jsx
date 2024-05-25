import { describe, it} from 'vitest'; // Import von ViTest
import { render, screen } from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import StartPage from '../src/pages/startPage/StartPage';

import {MemoryRouter} from "react-router-dom"; // Import der zu testenden Komponente

/*
// Test-Suite für die StartPage-Komponente
test('renders "Senpai" text',  async () => {
    // Rendern der StartPage-Komponente

    const navSpy = vi.spyOn(navigate, 'navigate');
    const clickSpy = vi.spyOn(handleClick, 'handleClick')

    //expect(navSpy).toBeCalledT();

    expect(navSpy).toHaveBeenCalledWith("./login");

    render(<MemoryRouter>
        <StartPage />
        </MemoryRouter>);

    // Überprüfen, ob der Text "Senpai" auf der Seite gerendert wird
    const senpaiText = screen.getByText('Senpai');
    expect(senpaiText).toBeInTheDocument();// Assertion: Der Text "Senpai" sollte auf der Seite gerendert werden



});
*/

describe("StartPage", () => {
    it("renders the Start page", ()=>{
        render(<MemoryRouter><StartPage/></MemoryRouter>);
        screen.debug();
    });
});