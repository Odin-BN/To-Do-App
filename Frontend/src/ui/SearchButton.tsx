import React, { useContext } from "react";
//import SearchContext from "../context/SearchContext";
import { useTaskActions } from "../hooks/useTaskActions";

/**
 * SearchButton Component
 * 
 * This component renders a button that triggers the `fetchAndSetTasks` function.
 * The button is used to fetch and display the list of tasks filtered by the current search criteria.
 * 
 * @returns {JSX.Element} A button to initiate the task search.
 */
const SearchButton: React.FC = () => {
    //const { nameSearch, prioritySearch, flagSearch } = useContext(SearchContext);
    const { fetchAndSetTasks } = useTaskActions();

    const handleSearch = () => {
        fetchAndSetTasks(0, 10, null, null); // Trigger task fetching explicitly
    };

    return (
        <>
            {/* Button to trigger the task search */}
            <button
                style={{
                    padding: "0px", 
                    position: "absolute", 
                    top: "135px", // Positions the button vertically.
                    right: "75px", // Positions the button horizontally.
                    width: "180px", // Sets the width of the button.
                    height: "50px", // Sets the height of the button.
                    textAlign: "center", // Centers the text inside the button.
                }}
                onClick={handleSearch} // Calls the `fetchAndSetTasks` function when clicked.
            >
                Search
            </button> 
        </>
    );
};

export default SearchButton;