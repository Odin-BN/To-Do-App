import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

/**
 * OptionsStates Component
 * 
 * This component renders a dropdown menu for selecting task status options.
 * The options include "All", "Done", and "Undone".
 * 
 * It consumes the `SearchContext` to manage the selected status filter and update it.
 * 
 * @returns {JSX.Element} A dropdown menu for selecting task status.
 */
const OptionsStates: React.FC = () => {
    // Access the current status filter and its setter function from SearchContext.
    const { flagSearch, setFlagSearch } = useContext(SearchContext) || {};

    return (
        <div
            style={{
                padding: "0px",
                position: "absolute",
                top: "155px", // Positions the dropdown vertically.
                left: "100px", // Positions the dropdown horizontally.
            }}
        >
            <select
                value={flagSearch} // Binds the dropdown value to the current status filter.
                onChange={(e) => setFlagSearch(e.target.value)} // Updates the status filter on change.
                style={{
                    padding: "0px",
                    fontSize: "16px", // Sets the font size for the dropdown text.
                    border: "1px solid black", // Adds a border around the dropdown.
                    width: "400px", // Sets the width of the dropdown.
                    height: "40px", // Sets the height of the dropdown.
                }}
            >
                {/* Placeholder option to guide the user */}
                <option disabled value="All, Done, Undone">
                    All, Done, Undone
                </option>
                {/* Status filter options */}
                <option value="All">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
            </select>
        </div>
    );
};

export default OptionsStates;