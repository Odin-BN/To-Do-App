import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import NewToDoButton from "./NewToDoButton";
import SearchContext from "../context/SearchContext";
import { useTaskActions } from "../hooks/useTaskActions";
import "@testing-library/jest-dom/vitest";

// Mock the custom hook
vi.mock("../hooks/useTaskActions", () => ({
    useTaskActions: vi.fn(),
}));

// Mock implementation of useTaskActions
const mockUseTaskActions = {
    fetchAndSetTasks: vi.fn(),
    updateTaskById: vi.fn(),
    deleteTaskById: vi.fn(),
    toggleTaskCompletion: vi.fn(),
    toggleAllTasksCompletion: vi.fn(),
    handleSort: vi.fn(),
    sortPriority: null,
    sortDueDate: null,
};


// Mock the SearchContext
//const mockFetchTasks = vi.fn();
const mockSearchContextValue = {
    tasks: [],
    setTasks: vi.fn(),
    nameSearch: "",
    prioritySearch: "All",
    flagSearch: "All",
    setNameSearch: vi.fn(),
    setPrioritySearch: vi.fn(),
    setFlagSearch: vi.fn(),
    //fetchTasks: mockFetchTasks, // Include fetchTasks in the mock context
};

describe("NewToDoButton Component", () => {

    beforeEach(() => {
        (useTaskActions as ReturnType<typeof vi.fn>).mockReturnValue(mockUseTaskActions);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    /*beforeEach(() => {
        vi.clearAllMocks();
    });*/

    it("renders the New To Do button", () => {
        render(
            <SearchContext.Provider value={mockSearchContextValue}>
                <NewToDoButton />
            </SearchContext.Provider>
        );

        // Check that the button is rendered
        expect(screen.getByText("+ New To Do")).toBeInTheDocument();
    });
    
    it("opens the ToDoModal when the button is clicked", () => {

        // Click the New To Do button
        fireEvent.click(screen.getByText("+ New To Do"));

        // Check that the modal is displayed
        expect(screen.getByText("Create a New Task")).toBeInTheDocument();
    });
    
    it("closes the ToDoModal when the close button is clicked", async () => {
        
        // Open the modal
        fireEvent.click(screen.getByText("+ New To Do"));

        // Click the close button
        fireEvent.click(screen.getByText("Close"));

        // Check that the modal is no longer displayed
        await waitFor(() => {
            expect(screen.queryByText("Create a New Task")).not.toBeInTheDocument();
        });
    });
    
    it("does not allow saving a task with a name longer than 120 characters", async () => {
        
        // Open the modal
        fireEvent.click(screen.getByText("+ New To Do"));

        // Enter a name longer than 120 characters
        const taskNameInput = screen.getByLabelText("Task Name (max 120 characters)");
        fireEvent.change(taskNameInput, { target: { value: "a".repeat(121) } });

        // Click the Save Task button
        fireEvent.click(screen.getByText("Save Task"));

        // Check that an error message is displayed
        expect(await screen.findByText("Task name cannot exceed 120 characters.")).toBeInTheDocument();
    });
    
    it("displays an error message if saving the task fails", async () => {
        globalThis.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
                headers: new Headers(),
                redirected: false,
                type: "basic",
                url: "http://localhost:9090/todos",
            } as Response)
        );

        //render(            <SearchContext.Provider value={mockSearchContextValue}>                <NewToDoButton />            </SearchContext.Provider>        );        // Open the modal        fireEvent.click(screen.getByText("+ New To Do"));
        // Enter valid inputs
        const taskNameInput = screen.getByLabelText("Task Name (max 120 characters)");
        fireEvent.change(taskNameInput, { target: { value: "New Task" } });

        // Click the Save Task button
        fireEvent.click(screen.getByText("Save Task"));

        // Check that an error message is displayed
        expect(await screen.findByText("Failed to save task. Please try again.")).toBeInTheDocument();
    });
});
