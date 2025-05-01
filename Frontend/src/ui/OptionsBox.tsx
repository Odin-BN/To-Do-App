import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

//Component of the box with the priority options (All, High, Medium, Low)

const OptionsBox: React.FC = () => {
    const { PrioritySearch, setprioritySearch } = useContext(SearchContext) || {};
    
    return (
        <div style={{ padding: "0px", position: "absolute", top: "95px", left: "100px"}}>
            <select
                value={PrioritySearch} onChange={(e) => setprioritySearch(e.target.value)}
                style={{
                    padding: "0px",
                    fontSize: "16px",
                    border: "1px solid black",
                    //borderRadius: "40px",
                    width: "400px",
                    height: "40px",
                }}
            >
                <option disabled value= "All, High, Medium, Low">All, High, Medium, Low</option>
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
    );
};

export default OptionsBox