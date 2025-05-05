import React, { useContext } from "react";
import AverageTimeContext from "../context/AverageTimeContext";

/**
 * AveragesBox Component
 * 
 * This component displays the average completion times for tasks, including:
 * - Overall average time for all tasks.
 * - Average times categorized by task priority (low, medium, high).
 * 
 * It consumes the `AverageTimeContext` to retrieve the average completion times.
 * 
 * @returns {JSX.Element} A styled box displaying the average completion times.
 */
const AveragesBox: React.FC = () => {
    // Access the averages from the AverageTimeContext.
    const { averages } = useContext(AverageTimeContext);

    return (
        <div
            role="region"
            aria-label="Average time to finish tasks"
            style={{
                border: "2px solid black", // Adds a border around the box.
                display: "flex", // Enables flexbox layout.
                position: "absolute", // Positions the box absolutely within its parent.
                justifyContent: "space-between", // Distributes child elements evenly with space between them.
                alignItems: "center", // Aligns child elements vertically in the center.
                padding: "5px", // Adds padding inside the box.
                borderRadius: "10px", // Rounds the corners of the box.
                top: "960px", // Positions the box vertically.
                width: "97%", // Sets the width of the box relative to its parent.
            }}
        >
            {/* Section for displaying the overall average time */}
            <div style={{ flex: 1, textAlign: "left" }}>
                <p>Average time to finish tasks: {averages.total}</p>
            </div>

            {/* Section for displaying average times by priority */}
            <div style={{ flex: 2, display: "flex", justifyContent: "space-evenly" }}>
                <div>
                    <p>Average time to finish tasks by priority:</p>
                </div>
                <div>
                    <p>Low: {averages.low}</p>
                </div>
                <div>
                    <p>Medium: {averages.medium}</p>
                </div>
                <div>
                    <p>High: {averages.high}</p>
                </div>
            </div>
        </div>
    );
};

export default AveragesBox;