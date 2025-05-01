import React from 'react';
import SearchBox from './SearchBox';
import OptionsBox from './OptionsBox';
import OptionsStates from './OptionsStates';
import SearchButton from './SearchButton';

//Component that integrates all the elements for the filter of the tasks

const BlackBorderBox: React.FC = () => {
    return (
      <div
        style={{
          border: "2px solid black",
          padding: "16px",
          width: "1663px",
          height: "180px",
          textAlign: "center",
          position: "relative",
          top: "0px",
          //left: "50px",
        }}
      >
        
        
        <div style={{ padding: "0px", textAlign: "left"}}>
          <div style= {{ marginTop: "30px", marginBottom: "40px"}}> Name </div>
          <div style= {{ marginBottom: "40px"}}> Priority </div>
          <div> State </div>
        </div>


        <SearchBox/>
        <OptionsBox/>
        <OptionsStates/>
        <SearchButton />

      </div> 
  
    );    
  };
  
  
  export default BlackBorderBox;