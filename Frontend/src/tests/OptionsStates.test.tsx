import { render, screen} from "@testing-library/react";
import { it, describe, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import OptionsStates from "../ui/OptionsStates";

//Checks render of the element

describe("OptionsStates", () => {
    it("should render the states options correctly", () => {
        render(<OptionsStates/>);
        expect(screen.getAllByText(/All/i)[1]).toBeInTheDocument();
        expect(screen.getAllByText(/Done/i)[1]).toBeInTheDocument();
        expect(screen.getAllByText(/Undone/i)[1]).toBeInTheDocument();
    });

    /*it("should select the correct state option", () => {
        render(<OptionsStates/>);
        fireEvent.click(screen.getAllByText(/Done/i)[0]);
        expect(screen.getAllByText(/Done/i)[1]).toHaveClass("selected");
    });*/
});