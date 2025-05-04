import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '../ui/Task';

/**
 * Context type definition for SearchContext.
 * - `tasks`: List of tasks filtered by search criteria.
 * - `setTasks`: Function to update the list of tasks.
 * - `nameSearch`: Search term for filtering tasks by name.
 * - `prioritySearch`: Search term for filtering tasks by priority.
 * - `flagSearch`: Search term for filtering tasks by state/flag.
 * - `setNameSearch`: Function to update the name search term.
 * - `setPrioritySearch`: Function to update the priority search term.
 * - `setFlagSearch`: Function to update the flag search term.
 * - `fetchTasks`: Function to fetch tasks from the backend based on search criteria.
 */
type SearchContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    nameSearch: string;
    prioritySearch: string;
    flagSearch: string;
    setNameSearch: (text: string) => void;
    setPrioritySearch: (priority: string) => void;
    setFlagSearch: (flag: string) => void;
    fetchTasks: (page: number, size: number, sortPriority: string | null, sortDueDate: string | null) => void;
};

/**
 * Creates a React context for managing and providing task search functionality.
 * Default values are set for tasks and search criteria, and all functions are no-ops by default.
 */
const SearchContext = createContext<SearchContextType>({
    tasks: [],
    setTasks: () => {}, // Default no-op function.
    nameSearch: "",
    prioritySearch: "All",
    flagSearch: "All",
    setNameSearch: () => {}, // Default no-op function.
    setPrioritySearch: () => {}, // Default no-op function.
    setFlagSearch: () => {}, // Default no-op function.
    fetchTasks: () => {}, // Default no-op function.
});

type SearchProviderProps = {
    children: ReactNode;
};

/**
 * Provider component for SearchContext.
 * Manages the state for task search criteria and provides functions to fetch filtered tasks.
 */
export const SearchProvider = ({ children }: SearchProviderProps) => {
    // State to store the list of tasks.
    const [tasks, setTasks] = useState<Task[]>([]);
    // State to store the search term for task names.
    const [nameSearch, setNameSearch] = useState<string>("");
    // State to store the search term for task priority.
    const [prioritySearch, setPrioritySearch] = useState<string>("All");
    // State to store the search term for task state/flag.
    const [flagSearch, setFlagSearch] = useState<string>("All");

    /**
     * Fetches tasks from the backend API based on the current search criteria.
     * - Constructs a dynamic URL with query parameters for name, priority, and flag searches.
     * - Includes pagination and sorting parameters.
     * - Updates the `tasks` state with the fetched data.
     * - Logs an error to the console if the fetch operation fails.
     */
    const fetchTasks = async (page: number, size: number, sortPriority: string | null, sortDueDate: string | null) => {
        let searchUrl = `http://localhost:9090/todos?page=${page}&size=${size}`; // Base API endpoint with pagination.

        // Append query parameters based on search criteria.
        if (nameSearch) {
            searchUrl += `&nameFilter=${encodeURIComponent(nameSearch)}`;
        }
        if (prioritySearch && prioritySearch !== "All") {
            searchUrl += `&priorityFilter=${encodeURIComponent(prioritySearch)}`;
        }
        if (flagSearch && flagSearch !== "All") {
            searchUrl += `&statusFilter=${encodeURIComponent(flagSearch)}`;
        }
        if (sortPriority) {
            searchUrl += `&sortPriority=${sortPriority}`;
        }
        if (sortDueDate) {
            searchUrl += `&sortDueDate=${sortDueDate}`;
        }

        try {
            const response = await fetch(searchUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error fetching tasks");
            }

            const data: Task[] = await response.json();
            console.log("Fetched tasks:", data);
            setTasks(data); // Update state with fetched tasks.
        } catch (error) {
            console.error("Error during task search:", error);
        }
    };

    return (
        /**
         * Provides the task list, search criteria, and related functions
         * to all child components within the context.
         */
        <SearchContext.Provider
            value={{
                tasks,
                setTasks,
                nameSearch,
                prioritySearch,
                flagSearch,
                setNameSearch,
                setPrioritySearch,
                setFlagSearch,
                fetchTasks,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;

