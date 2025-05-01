import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

//Component of the box with the Status options (All, Done, Undone)

const OptionsStates: React.FC = () => {
    const { FlagSearch, setflagSearch } = useContext(SearchContext) || {};
    
    return (
        <div style={{ padding: "0px", position: "absolute", top: "155px", left: "100px"}}>
            <select
                value={FlagSearch}
                onChange={(e) => setflagSearch(e.target.value)}
                style={{
                    padding: "0px",
                    fontSize: "16px",
                    border: "1px solid black",
                    //borderRadius: "40px",
                    width: "400px",
                    height: "40px",
                }}
            >
                <option disabled value= "All, Done, Undone">All, Done, Undone</option>
                <option value="All">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
            </select>
        </div>
    );
};

export default OptionsStates