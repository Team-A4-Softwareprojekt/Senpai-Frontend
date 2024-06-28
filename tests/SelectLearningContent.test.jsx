import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import SelectPlatformPage from '../src/pages/selectPlatformPage/SelectPlatformPage.jsx';

import {MemoryRouter} from "react-router-dom";

describe("SelectLearningContent", () => {
    it("renders the SelectLearningContent page", () => {
        render(<MemoryRouter><SelectPlatformPage/></MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });
});