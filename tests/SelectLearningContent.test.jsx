import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import SelectPlatformPage from '../src/pages/selectPlatformPage/SelectPlatformPage.jsx';
import {MemoryRouter} from "react-router-dom";

describe("SelectLearningContent", () => {
    it("renders the SelectLearningContent page", () => {
        render(<MemoryRouter><SelectPlatformPage/></MemoryRouter>);
        screen.debug();
    });
});