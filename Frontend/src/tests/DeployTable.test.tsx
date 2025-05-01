import { render, screen } from "@testing-library/react";
import DeployTable from "../ui/DeployTable";
import { it, describe, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

//Checks render of the element

describe("DeployTable", () => {
    it("should render the headers of the table", () => {
        

        render(<DeployTable />);

        expect(screen.getByRole("columnheader", {name: /Name/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /Priority/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /Due Date/i})).toBeInTheDocument();
        expect(screen.getByRole("columnheader", {name: /Actions/i})).toBeInTheDocument();
    })
})