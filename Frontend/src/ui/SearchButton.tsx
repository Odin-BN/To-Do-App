import React from 'react';
//import SearchContext from '../context/SearchContext';

/**
 * SearchButton Component
 * 
 * This component renders a button that triggers the `fetchTasks` function from the `SearchContext`.
 * The button is used to fetch and display the list of tasks filtered by the current search criteria.
 * 
 * @returns {JSX.Element} A button to initiate the task search.
 */
const SearchButton: React.FC = () => {
    // Access the `fetchTasks` function from the SearchContext to fetch filtered tasks.
    //const { fetchTasks } = useContext(SearchContext);

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
                //onClick={() => fetchTasks()} // Calls the `fetchTasks` function when clicked.
            >
                Search
            </button> 
        </>
    );
};

export default SearchButton;