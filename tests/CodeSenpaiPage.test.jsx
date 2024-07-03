import {describe, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import CodeSenpaiPage from "../src/pages/codeSenpaiPage/CodeSenpaiPage.jsx";
import {MockPlayerProvider, MockGapTextContextProvider} from "./test-utils.jsx";


describe("CodeSenpaiPage", () => {
    it("renders the CodeSenpaiPage", () => {
        render(
            <MemoryRouter>
                <MockPlayerProvider>
                    <MockGapTextContextProvider>
                        <CodeSenpaiPage/>
                    </MockGapTextContextProvider>
                </MockPlayerProvider>
            </MemoryRouter>);
        screen.debug();
    });
});
