import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

/**
 * OptionsBox Component
 * 
 * This component renders a dropdown menu for selecting task priority levels.
 * The options include "All", "High", "Medium", and "Low".
 * 
 * It consumes the `SearchContext` to manage the selected priority filter and update it.
 * 
 * @returns {JSX.Element} A dropdown menu for selecting task priority.
 */
const OptionsBox: React.FC = () => {
    // Access the current priority filter and its setter function from SearchContext.
    const { prioritySearch, setPrioritySearch } = useContext(SearchContext) || {};

    return (
        <div
            style={{
                padding: "0px",
                position: "absolute",
                top: "95px", // Positions the dropdown vertically.
                left: "100px", // Positions the dropdown horizontally.
            }}
        >
            <select
                value={prioritySearch} // Binds the dropdown value to the current priority filter.
                onChange={(e) => setPrioritySearch(e.target.value)} // Updates the priority filter on change.
                style={{
                    padding: "0px",
                    fontSize: "16px", // Sets the font size for the dropdown text.
                    border: "1px solid black", // Adds a border around the dropdown.
                    width: "400px", // Sets the width of the dropdown.
                    height: "40px", // Sets the height of the dropdown.
                }}
            >
                {/* Placeholder option to guide the user */}
                <option disabled value="All, High, Medium, Low">
                    All, High, Medium, Low
                </option>
                {/* Priority filter options */}
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
};

export default OptionsBox;