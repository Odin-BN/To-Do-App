import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';

//Component of the search button to call the function to obtain the list of tasks filter

const SearchButton: React.FC = () => {
    
    const { fetchTasks } = useContext(SearchContext);
    

    
    return (
        <>
            <button style={{
                padding: "0px", 
                position: "absolute", 
                top: "135px", 
                right: "75px",
                width: "180px",
                height: "50px",
                textAlign: "center",}} 
                onClick={() => fetchTasks()}>Search</button> 
        </>
    )
}

export default SearchButton;