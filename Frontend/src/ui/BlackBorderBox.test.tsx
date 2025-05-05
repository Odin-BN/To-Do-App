import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BlackBorderBox from "./BlackBorderBox";
import SearchContext from "../context/SearchContext";
import "@testing-library/jest-dom/vitest";

// Mock the SearchContext
const mockSetNameSearch = vi.fn();
const mockSetPrioritySearch = vi.fn();
const mockSetFlagSearch = vi.fn();
const mockSearchContextValue = {
    tasks: [],
    setTasks: vi.fn(),
    nameSearch: "",
    prioritySearch: "All",
    flagSearch: "All",
    setNameSearch: mockSetNameSearch,
    setPrioritySearch: mockSetPrioritySearch,
    setFlagSearch: mockSetFlagSearch,
};

describe("BlackBorderBox Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders all filtering elements correctly", () => {
        // Render the component with the mocked context
        render(
            <SearchContext.Provider value={mockSearchContextValue}>
                <BlackBorderBox />
            </SearchContext.Provider>
        );

        // Check for labels
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getAllByText("Priority")[0]).toBeInTheDocument(); // Ensure we target the first "Priority" text
        expect(screen.getAllByText("State")[0]).toBeInTheDocument();

        // Check for input and dropdowns
        expect(screen.getByPlaceholderText("Enter task name...")).toBeInTheDocument();

        // Scope the query to specific dropdowns using their labels
        const priorityDropdown = screen.getByLabelText("Priority");
        const stateDropdown = screen.getByLabelText("State");

        expect(priorityDropdown).toHaveDisplayValue("All"); // Check the default value of the priority dropdown
        expect(stateDropdown).toHaveDisplayValue("All"); // Check the default value of the state dropdown

        // Check for the search button
        expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    });

    
    it("updates the name search filter when typing in the search box", () => {
    
        const searchBox = screen.getByPlaceholderText("Enter task name...");
        fireEvent.change(searchBox, { target: { value: "Task 1" } });

        expect(mockSetNameSearch).toHaveBeenCalledWith("Task 1");
    });
    
    it("updates the priority filter when selecting a priority", () => {

        const priorityDropdown = screen.getByLabelText("Priority");
        fireEvent.change(priorityDropdown, { target: { value: "High" } });

        expect(mockSetPrioritySearch).toHaveBeenCalledWith("High");
    });
    
    it("updates the state filter when selecting a state", () => {

        const stateDropdown = screen.getByLabelText("State");
        fireEvent.change(stateDropdown, { target: { value: "Done" } });

        expect(mockSetFlagSearch).toHaveBeenCalledWith("Done");
    });
    
    it("triggers the search action when input or dropdowns are updated", async () => {

        // Update the search input
        const searchBox = screen.getByPlaceholderText("Enter task name...");
        fireEvent.change(searchBox, { target: { value: "Task 1" } });

        // Verify that the name search function is called
        expect(mockSetNameSearch).toHaveBeenCalledWith("Task 1");

        // Update the priority dropdown
        const priorityDropdown = screen.getByLabelText("Priority");
        fireEvent.change(priorityDropdown, { target: { value: "High" } });

        // Verify that the priority search function is called
        expect(mockSetPrioritySearch).toHaveBeenCalledWith("High");

        // Update the state dropdown
        const stateDropdown = screen.getByLabelText("State");
        fireEvent.change(stateDropdown, { target: { value: "Done" } });

        // Verify that the state search function is called
        expect(mockSetFlagSearch).toHaveBeenCalledWith("Done");
    });
    
    it("handles empty states gracefully", () => {

        // Ensure no errors occur when there are no tasks
        expect(screen.getByPlaceholderText("Enter task name...")).toBeInTheDocument();
    });
    /*
    it("calls fetchTasks when nameSearch, prioritySearch, or flagSearch changes", async () => {
        // Mock fetchTasks
        const mockFetchTasks = vi.fn();

        // Mock SearchContext with fetchTasks
        const mockSearchContextValueWithFetch = {
            ...mockSearchContextValue,
            fetchTasks: mockFetchTasks, // Replace fetchAndSetTasks with fetchTasks
        };

        render(
            <SearchContext.Provider value={mockSearchContextValueWithFetch}>
                <BlackBorderBox />
            </SearchContext.Provider>
        );

        // Use getByTestId to target the specific search box
        const searchBox = screen.getByTestId("name-search-box");
        fireEvent.change(searchBox, { target: { value: "Task 1" } });

        // Verify that fetchTasks is called after nameSearch changes
        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalled();
        });

        // Update the priority dropdown
        const priorityDropdown = screen.getByLabelText("Priority");
        fireEvent.change(priorityDropdown, { target: { value: "High" } });

        // Verify that fetchTasks is called after prioritySearch changes
        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalled();
        });

        // Update the state dropdown
        const stateDropdown = screen.getByLabelText("State");
        fireEvent.change(stateDropdown, { target: { value: "Done" } });

        // Verify that fetchTasks is called after flagSearch changes
        await waitFor(() => {
            expect(mockFetchTasks).toHaveBeenCalled();
        });

        // Ensure fetchTasks is called the correct number of times
        expect(mockFetchTasks).toHaveBeenCalledTimes(3);
    });*/
});

