import React, { createContext, useState } from "react";

/**
 * Context type definition for AverageTimeContext.
 * - `averages`: An object containing average completion times for tasks categorized by priority levels (total, low, medium, high).
 * - `fetchAverages`: A function to fetch and update the average completion times from the backend API.
 */
type AverageTimeType = {
    averages: {
        total: string; // Average completion time for all tasks.
        low: string;   // Average completion time for low-priority tasks.
        medium: string; // Average completion time for medium-priority tasks.
        high: string;  // Average completion time for high-priority tasks.
    };
    fetchAverages: () => void; // Function to fetch averages from the backend.
};

/**
 * Creates a React context for managing and providing average task completion times.
 * Default values are set to "N/A" for all averages, and `fetchAverages` is a no-op function.
 */
const AverageTimeContext = createContext<AverageTimeType>({
    averages: { total: "N/A", low: "N/A", medium: "N/A", high: "N/A" },
    fetchAverages: () => {}, // Default no-op function.
});

/**
 * Provider component for AverageTimeContext.
 * Fetches and provides average task completion times to its children components.
 */
export const AverageTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to store the average completion times for tasks.
    const [averageCompletionTimes, setAverageCompletionTimes] = useState({
        total: "N/A",
        low: "N/A",
        medium: "N/A",
        high: "N/A",
    });

    /**
     * Fetches average task completion times from the backend API and updates the state.
     * - API Endpoint: `http://localhost:9090/todos/averages`
     * - Updates the `averageCompletionTimes` state with the fetched data.
     * - Logs an error to the console if the fetch operation fails.
     */
    const fetchAverages = async () => {
        try {
            const response = await fetch("http://localhost:9090/todos/averages");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAverageCompletionTimes(data); // Update state with fetched averages.
        } catch (error) {
            console.error("Error fetching average completion times:", error);
        }
    };

    return (
        /**
         * Provides the `averageCompletionTimes` state and `fetchAverages` function
         * to all child components within the context.
         */
        <AverageTimeContext.Provider value={{ averages: averageCompletionTimes, fetchAverages }}>
            {children}
        </AverageTimeContext.Provider>
    );
};

export default AverageTimeContext;