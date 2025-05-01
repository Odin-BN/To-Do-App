import { render, screen, fireEvent } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import NewToDoButton from "../ui/NewToDoButton";

//Checks render of the element

describe("NewToDoButton", () => {
    it("should render the button correctly", () => {
        render(<NewToDoButton/>);
        expect(screen.getByText(/New To Do/i)).toBeInTheDocument();
    });

    //Checks that the modal opnes when you click the New To Do button

    it("should open the modal when clicked", () => {
        render(<NewToDoButton/>);
        fireEvent.click(screen.getByText(/New To Do/i));
        expect(screen.getByText(/Create a New Task/i)).toBeInTheDocument();
    });
});