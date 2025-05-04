import React, { useState } from 'react';
import ToDoModal from './ToDoModal'; 

/**
 * NewToDoButton Component
 * 
 * This component renders a button that, when clicked, opens a modal for creating a new "To Do" task.
 * After the modal is closed, it triggers a refresh of the task list by calling `fetchTasks` from the `SearchContext`.
 * 
 * @returns {JSX.Element} A button and a modal for creating a new task.
 */
const NewToDoButton: React.FC = () => {
    // State to manage the visibility of the "To Do" modal.
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Access the `fetchTasks` function from the SearchContext to refresh the task list.

    return (
        <>
            {/* Button to open the "To Do" modal */}
            <button 
                style={{ 
                    padding: "0px", 
                    position: "absolute", 
                    top: "243px", 
                    width: "140px",
                    height: "40px",
                    textAlign: "center",
                }} 
                onClick={() => setIsModalVisible(true)} // Show the modal when clicked.
            >
                + New To Do
            </button> 

            {/* Modal for creating a new "To Do" task */}
            {isModalVisible && (
                <ToDoModal 
                    onClose={() => {
                        setIsModalVisible(false); // Hide the modal when closed.
                    }} 
                />
            )}
        </>
    );
};

export default NewToDoButton;