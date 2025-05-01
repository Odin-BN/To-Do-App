import React, { useContext } from "react";
import SearchContext from "../context/SearchContext";

//Component for the Search box for the Task Name to filter

const SearchBox: React.FC= () => {
    const { NameSearch, setnameSearch } = useContext(SearchContext) || {};

    return (
        <div style={{ padding: "0px", position: "absolute",top: "35px", left: "100px",}}>
            <input 
            type="text"
            value={NameSearch}
            onChange={(e) => setnameSearch(e.target.value)}
            placeholder="text..."
            style={{
                width: '1500px',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid black',
                borderRadius: '4px',
            }}
            />
            <p>{/* */}</p>
        </div>

    )
}

export default SearchBox