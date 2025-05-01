import React, { useContext } from "react";
import AverageTimeContext from '../context/AverageTimeContext'

//Bottom component to show the averages form the completed tasks

const AveragesBox: React.FC = () => {
        //Global imports for getting the averages
        const { averages } = useContext(AverageTimeContext);

        return (
            <div style={{
                border: "2px solid black",
                display: "flex",
                position: "absolute",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                borderRadius: "10px",
                top: "960px",
                width: "97%",
                //left: "10px",
            }}>
                <div style={{ flex: 1, textAlign: "left"}}>
                    <p>Average time to finish tasks: {averages.total}</p>
                </div>

                <div style={{ flex: 2, display: "flex", justifyContent: "space-evenly"}}>
                    <div>
                        <p>Average time to finish tasks by priority:</p>
                    </div>
                    <div>
                        <p>Low: {averages.low}</p>
                    </div>
                    <div>
                        <p>Medium: {averages.medium}</p>
                    </div>
                    <div>
                        <p>High: {averages.high}</p>
                    </div>
                </div>
            </div>
        );
};

export default AveragesBox;