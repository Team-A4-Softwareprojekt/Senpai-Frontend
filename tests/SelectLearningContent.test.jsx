import {describe, it} from 'vitest'; // Import von ViTest
import {render, screen} from '@testing-library/react'; // Import der render-Funktion von @testing-library/react
import SelectLearningContent from '../src/pages/selectLearningContent/SelectLearningContent.jsx';

import {MemoryRouter} from "react-router-dom";

describe("SelectLearningContent", () => {
    it("renders the SelectLearningContent page", () => {
        render(<MemoryRouter><SelectLearningContent/></MemoryRouter>);
        //expect(screen.getByText("Senpai")).toBeInTheDocument();
        //expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
        screen.debug();
    });
});