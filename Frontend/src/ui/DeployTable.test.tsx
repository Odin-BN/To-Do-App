import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { vi, it, describe, beforeEach, afterEach, expect } from "vitest";
import DeployTable from "./DeployTable";
import { AverageTimeProvider } from "../context/AverageTimeContext";
import { useTaskActions } from "../hooks/useTaskActions";
import SearchContext from "../context/SearchContext";
import "@testing-library/jest-dom/vitest";

// Mock the custom hook
vi.mock("../hooks/useTaskActions", () => ({
    useTaskActions: vi.fn(),
}));

// Mock data
const mockTasks = [
    { id: 1, name: "Task 1", priority: "High", dueDate: "2025-05-07", flag: false, rowColor: "red" },
    { id: 2, name: "Task 2", priority: "Medium", dueDate: "2025-05-02", flag: true, rowColor: "green" },
    { id: 3, name: "Task 3", priority: "Low", dueDate: "2025-05-03", flag: false, rowColor: "red" },
    { id: 4, name: "Task 4", priority: "High", dueDate: "2025-05-04", flag: true, rowColor: "green" },
    { id: 5, name: "Task 5", priority: "Medium", dueDate: "2025-05-05", flag: false, rowColor: "red" },
    { id: 6, name: "Task 6", priority: "Low", dueDate: "2025-05-06", flag: true, rowColor: "green" },
    { id: 7, name: "Task 7", priority: "High", dueDate: "2025-05-07", flag: false, rowColor: "red" },
    { id: 8, name: "Task 8", priority: "Medium", dueDate: "2025-05-08", flag: true, rowColor: "green" },
    { id: 9, name: "Task 9", priority: "Low", dueDate: "2025-05-09", flag: false, rowColor: "red" },
    { id: 10, name: "Task 10", priority: "High", dueDate: "2025-05-10", flag: true, rowColor: "green" },
    { id: 11, name: "Task 11", priority: "Medium", dueDate: "2025-05-11", flag: false, rowColor: "red" },
];

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

// Custom MockSearchProvider to inject mockTasks into the SearchContext
const MockSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SearchContext.Provider
            value={{
                tasks: mockTasks,
                setTasks: vi.fn(),
                nameSearch: "",
                prioritySearch: "All",
                flagSearch: "All",
                setNameSearch: vi.fn(),
                setPrioritySearch: vi.fn(),
                setFlagSearch: vi.fn(),
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

describe("DeployTable Component", () => {
    beforeEach(() => {
        (useTaskActions as ReturnType<typeof vi.fn>).mockReturnValue(mockUseTaskActions);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the task table with tasks", () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getByText to find the text "Task 1" and "Task 2" in the table
        const task1 = screen.getByText("Task 1");
        const task2 = screen.getByText("Task 2");

        expect(task1).toBeInTheDocument();
        expect(task2).toBeInTheDocument();
    });

    

    
    it("opens the edit modal when the Edit button is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Click the Edit button for the first task
        fireEvent.click(screen.getAllByText("Edit")[0]);

        // Check if the modal is displayed
        expect(await screen.findByText("Edit Task")).toBeInTheDocument();
    });

    

    it("calls updateTaskById when saving changes in the edit modal", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Open the edit modal
        fireEvent.click(screen.getAllByText("Edit")[0]);

        // Change the task name
        const nameInput = screen.getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "Updated Task 1" } });

        // Save changes
        fireEvent.click(screen.getByText("Save"));

        // Verify that updateTaskById was called
        await waitFor(() => {
            expect(mockUseTaskActions.updateTaskById).toHaveBeenCalledWith(1, {
                name: "Updated Task 1",
                priority: "High",
                dueDate: "2025-05-07",
            });
        });
    });
    

    it("calls deleteTaskById when the Remove button is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Click the Remove button for the first task
        fireEvent.click(screen.getAllByText("Remove")[0]);

        // Confirm deletion
        fireEvent.click(screen.getByText("Delete"));

        // Verify that deleteTaskById was called
        await waitFor(() => {
            expect(mockUseTaskActions.deleteTaskById).toHaveBeenCalledWith(1);
        });
    });

    
    it("toggles task completion when the checkbox is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Click the checkbox for the first task
        const checkbox = screen.getAllByRole("checkbox")[1];
        fireEvent.click(checkbox);

        // Verify that toggleTaskCompletion was called
        await waitFor(() => {
            expect(mockUseTaskActions.toggleTaskCompletion).toHaveBeenCalledWith(1, true);
        });
    });

    
    it("sorts tasks by priority when the Priority header is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getAllByRole to fetch all "Priority" column headers and select the first one
        const priorityHeaders = screen.getAllByRole("columnheader", { name: /priority/i });
        const priorityHeader = priorityHeaders[0]; // Select the first "Priority" header

        // Click the Priority header
        fireEvent.click(priorityHeader);

        // Verify that handleSort was called with "priority"
        await waitFor(() => {
            expect(mockUseTaskActions.handleSort).toHaveBeenCalledWith("priority");
        });
    });

    
    it("sorts tasks by due date when the Due Date header is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getAllByRole to fetch all "Due Date" column headers and select the first one
        const duedateHeaders = screen.getAllByRole("columnheader", { name: /due date/i });
        const duedateHeader = duedateHeaders[0]; // Select the first "Priority" header

        // Click the Due Date header
        fireEvent.click(duedateHeader);

        // Verify that handleSort was called with "duedate"
        await waitFor(() => {
            expect(mockUseTaskActions.handleSort).toHaveBeenCalledWith("duedate");
        });
    });

    
    it("paginates tasks when the Next button is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getAllByText to fetch all "Next" buttons and select the first one
        const nextButtons = screen.getAllByText("Next");
        const nextButton = nextButtons[0]; // Select the first "Next" button

        // Click the Next button and wait for state updates
        await act(async () => {
            fireEvent.click(nextButton);
        });

        // Verify that fetchAndSetTasks was called with the next page
        await waitFor(() => {
            expect(mockUseTaskActions.fetchAndSetTasks).toHaveBeenCalledWith(1, 10, null, null);
        });
    });

    it("paginates tasks when the Previous button is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getAllByText to fetch all "Next" buttons and select the first one
        const nextButtons = screen.getAllByText("Next");
        const nextButton = nextButtons[0]; // Select the first "Next" button

        // Click the Next button to go to the next page
        fireEvent.click(nextButton);

        // Use getAllByText to fetch all "Previuos" buttons and select the first one
        const previuosButtons = screen.getAllByText("Previous");
        const previousButton = previuosButtons[0]; // Select the first "Previous" button

        // Click the Previous button
        fireEvent.click(previousButton);

        // Verify that fetchAndSetTasks was called with the previous page
        await waitFor(() => {
            expect(mockUseTaskActions.fetchAndSetTasks).toHaveBeenCalledWith(0, 10, null, null);
        });
    });

    
    it("displays the averages box", () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Use getAllByRole to fetch all "Averages Boxes" and select the first one
        const averagesBoxes = screen.getAllByRole("region", { name: /average time to finish tasks/i });
        const averagesBox = averagesBoxes[0]; // Select the first "Averages Box"
        
        expect(averagesBox).toBeInTheDocument();
    });

    
    it("toggles all tasks completion when the top checkbox is clicked", async () => {
        render(
            <MockSearchProvider>
                <AverageTimeProvider>
                    <DeployTable />
                </AverageTimeProvider>
            </MockSearchProvider>
        );

        // Click the top checkbox
        const topCheckbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(topCheckbox);

        // Verify that toggleAllTasksCompletion was called
        await waitFor(() => {
            expect(mockUseTaskActions.toggleAllTasksCompletion).toHaveBeenCalledWith(mockTasks, false);
        });
        await waitFor(() => {
    });
})});