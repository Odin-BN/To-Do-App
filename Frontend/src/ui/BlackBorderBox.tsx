import React from 'react';
import SearchBox from './SearchBox';
import OptionsBox from './OptionsBox';
import OptionsStates from './OptionsStates';
import SearchButton from './SearchButton';

/**
 * BlackBorderBox Component
 * 
 * This component serves as a container for task filtering elements. It integrates:
 * - A search box for entering task names.
 * - Dropdowns or options for filtering tasks by priority and state.
 * - A search button to trigger the filtering action.
 * 
 * The component is styled with a black border and organizes its child components
 * in a visually structured layout.
 * 
 * @returns {JSX.Element} A styled container with task filtering elements.
 */
const BlackBorderBox: React.FC = () => {
    return (
        <div
            style={{
                border: "2px solid black", // Adds a black border around the container.
                padding: "16px", // Adds padding inside the container.
                width: "1663px", // Sets the width of the container.
                height: "180px", // Sets the height of the container.
                textAlign: "center", // Centers text inside the container.
                position: "relative", // Positions the container relative to its parent.
                top: "0px", // Positions the container at the top of its parent.
            }}
        >
            {/* Labels for the filtering sections */}
            <div style={{ padding: "0px", textAlign: "left" }}>
                <div style={{ marginTop: "30px", marginBottom: "40px" }}> Name </div>
                <div style={{ marginBottom: "40px" }}> Priority </div>
                <div> State </div>
            </div>

            {/* Task filtering components */}
            <SearchBox /> {/* Input box for searching tasks by name */}
            <OptionsBox /> {/* Dropdown or options for selecting task priority */}
            <OptionsStates /> {/* Dropdown or options for selecting task state */}
            <SearchButton /> {/* Button to trigger the search/filtering */}
        </div>
    );
};

export default BlackBorderBox;