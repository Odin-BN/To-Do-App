import React, { useState } from 'react';
import "./ToDoModal.css"

//Modal for creating a New To Do

interface ToDoModalProps {
    onClose: () => void;  //To close the Modal
}

const ToDoModal: React.FC<ToDoModalProps> = ({ onClose }) => {
    const [toDoName, setToDoName] = useState("");
    const [priority, setPriority] = useState("Low");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!toDoName.trim){
            setError("Task name cannot be empty.");
            return;
        }
        if (toDoName.length > 120){
            setError("Task name cannot exceed 120 characters.");
            return;
        }

        setError("");

        const newToDo = {
            name: toDoName,
            priority: priority,
            deadline: deadline || null,
        };

        try {
            const response = await fetch("http://localhost:9090/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json", }, body: JSON.stringify(newToDo),
            });

            if (!response.ok) {
                throw new Error("Failed to save task");
            }

            onClose();
            setToDoName("");
            setDeadline("");
            setPriority("Low");

        }  catch (err) {
            console.error("Error saving task:", err);
            setError("Failed to save task. Please try again.")
        }
        //console.log("New Task:", newToDo); //Para verlo en la consola de prueba
        
    };

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>Create a New Task</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSave}>
                    <div>
                        <label htmlFor='toDoName'>Task Name (max 120 characters)</label>
                        <input
                            type="text"
                            id="toDoName"
                            maxLength={120}
                            value={toDoName}
                            onChange={(e) => setToDoName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor='priority'>Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>

                        </select>
                    </div>

                    <div>
                        <label htmlFor='deadline'>Deadline</label>
                        <input
                            type='data'
                            id='deadline'
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <button type="submit">Save Task</button>
                </form>
                <button className='close-button' onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ToDoModal;