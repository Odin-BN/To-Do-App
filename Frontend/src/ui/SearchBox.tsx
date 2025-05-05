import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

/**
 * SearchBox Component
 * 
 * This component renders an input box for filtering tasks by their name.
 * It consumes the `SearchContext` to manage the search term and update it dynamically.
 * 
 * @returns {JSX.Element} An input box for entering a task name to filter the task list.
 */
const SearchBox: React.FC = () => {
    // Access the current name search term and its setter function from SearchContext.
    const { nameSearch, setNameSearch } = useContext(SearchContext) || {};

    return (
        <div
            style={{
                padding: "0px",
                position: "absolute",
                top: "35px", // Positions the input box vertically.
                left: "100px", // Positions the input box horizontally.
            }}
        >
            <input
                type="text"
                data-testid="name-search-box" // Add a unique test ID
                value={nameSearch} // Binds the input value to the current name search term.
                onChange={(e) => setNameSearch(e.target.value)} // Updates the name search term on input change.
                placeholder="Enter task name..." // Placeholder text to guide the user.
                style={{
                    width: "1500px", // Sets the width of the input box.
                    padding: "10px", // Adds padding inside the input box.
                    fontSize: "16px", // Sets the font size for the input text.
                    border: "1px solid black", // Adds a border around the input box.
                    borderRadius: "4px", // Rounds the corners of the input box.
                }}
            />
        </div>
    );
};

export default SearchBox;