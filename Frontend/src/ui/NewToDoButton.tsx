import React, { useContext, useState } from 'react';
import ToDoModal from './ToDoModal'; 
import SearchContext from '../context/SearchContext';

//Component of the button to create a new To Do

const NewToDoButton: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const {fetchTasks } = useContext(SearchContext)

    return (
        <>
            {/*The button of new to do*/}
            <button style={{ 
                padding: "0px", 
                position: "absolute", 
                top: "243px", 
                width: "140px",
                height: "40px",
                textAlign: "center",}} 
                onClick={() => setShowModal(true)}>+ New To Do</button> 

            {/*The modal after doing click*/}
            {showModal && (<ToDoModal onClose={() => {setShowModal(false); fetchTasks()}} /> 
        )}
      </>
    );
};

export default NewToDoButton;