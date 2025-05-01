import { render, screen} from "@testing-library/react";
import { it, describe, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import OptionsBox from "../ui/OptionsBox";

//Checks render of the element

describe("OptionsBox", () => {
    it("should render the priority options correctly", () => {
        render(<OptionsBox/>);
        expect(screen.getAllByText(/High/i)[1]).toBeInTheDocument();
        expect(screen.getAllByText(/Medium/i)[1]).toBeInTheDocument();
        expect(screen.getAllByText(/Low/i)[1]).toBeInTheDocument();
    });
});