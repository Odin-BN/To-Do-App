import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../context/SearchContext';
import { Task } from './Task';
import AverageTimeContext from '../context/AverageTimeContext'
import AveragesBox from './AveragesBox';

//Table to display the tasks of the list, and also where the sorting and pagination occurs

const DeployTable: React.FC = () => {
    //const [checkedState, setCheckedState]= useState<boolean[]>([false, false, false, false]);
    //Global imports of tasks and functions
    const { fetchTasks } = useContext(SearchContext);
    const { tasks } = useContext(SearchContext) ?? { tasks: []};

    //Global imports for getting the averages
    const { fetchAverages } = useContext(AverageTimeContext);

    //To sort the tasks by priority and due date.
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    //For the Edit and Remove button
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState({name: "", priority: "", deadline: ""})

    //Modal for Editing
    const handleEditClick = (task: Task | any) => {
        setSelectedTask(task);
        setEditedTask({ name: task.name, priority: task.priority, deadline: task.dueDate ? task.dueDate : ""});
        setIsEditModalOpen(true);
    };

    //Modal for removing a task
    const handleRemoveClick = (task: Task | any) => {
        setSelectedTask(task);
        setIsDeleteModalOpen(true);
    };

    //Functinon of PUT to update task
    const UpdateTasks = async () => {
        if (!selectedTask) return;
        try {
            await fetch(`http://localhost:9090/todos/${selectedTask.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(editedTask),
            });
            fetchTasks();
            setIsEditModalOpen(false);
        }  catch (error) {
            console.error("Error updating task: ", error);
        }
    };

    //Function of DELETE to delete a task
    const DeleteTasks = async () => {
        if(!selectedTask) return;
        try {
            await fetch(`http://localhost:9090/todos/${selectedTask.id}`, {method: "DELETE"});
            fetchTasks();
            //fetchAverages();
            setIsDeleteModalOpen(false);
        }  catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    //For the pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; 

    useEffect(() => { //Add that it only restores the values when the search button is click
        setSortField(null);
        setSortOrder("asc");
        setCurrentPage(1);
    }, [tasks]);

    //Selecting which category will sort and order
    const handleSort = (field: "priority" | "duedate") => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }   else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

        //Transforms the categories of priority to numnbers in order to use the .sort built-in fuction
    const getPriorityValue = (priority: string) => {
        const priorityMap: { [key: string]: number } = { High: 3, Medium: 2, Low: 1};
        return priorityMap[priority] || 0;
    };

    //Sorting the elements of the list by the chosen category 
    const sortedTasks: Task[] = (sortField
     ? [...tasks].sort((a,b) => {
        let comparison = 0;
        if (sortField === "priority") {
            comparison = getPriorityValue(a.priority) - getPriorityValue(b.priority);
        } else if (sortField === "duedate") {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
            comparison = dateA - dateB;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      })
     : tasks) as Task[];

     //Calculates the total number of pages
     const totalPage = Math.ceil(sortedTasks.length / itemsPerPage); //add that it starts in 1

    //It creates the list of tasks per current page
     const paginatedTasks = (sortedTasks as Task[]).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    //Statement to check if the next page button is can be click
     const goToNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
     };

    //Statement to check if the previous page button is can be click
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    //Send the status flag of the task when clicking a box
    const handleCheckboxChange = async (taskId: number, taskFlag: boolean) => {
        try {
            console.log(`Updating task ${taskId} to flag: ${taskFlag}`);

            await fetch(`http://localhost:9090/todos/${taskId}/flag`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    flag: taskFlag,
                }),
            });

            fetchTasks();
            fetchAverages();
        }  catch (error) {
            console.error("Error updating task status:", error)
        }
    };


    //Checkbox for toggle the flag status the tasks cof the current page
    const areAllTasksCompleted = paginatedTasks.length > 0 && paginatedTasks.every(task => task.flag);

    const handleFlagAllTasks = async () => {
        try {
            const taskstoUpdate = paginatedTasks.filter(task => task.flag === areAllTasksCompleted);

            await Promise.all(taskstoUpdate.map(task => handleCheckboxChange(task.id, !areAllTasksCompleted)));

            fetchTasks();
            fetchAverages();
        }  catch (error) {
            console.error("Error updating the tasks status:", error);
        }
    };

    return (
        <div>
        <table
        style={{
          width: "97%",
          borderCollapse: "collapse",
          position: "relative",
          top: "54px",
          //left: "50px",
          border: "1px solid black",
        }}
        >
            <thead>
                <tr style={{backgroundColor: "rgb(209, 204, 204)"}}>
                    <th style={{width: "5%", border: "1px solid black", padding: "10px"}}>
                        <input
                            type="checkbox"
                            checked={areAllTasksCompleted}
                            onChange={handleFlagAllTasks}
                        />
              
                    </th>
                    <th style={{width: "20%", border: "1px solid black", padding: "10px"}}>
                    Name
                    </th>
                    <th onClick={() => handleSort("priority")}
                    style={{width: "20%", border: "1px solid black", padding: "10px", cursor: "pointer"}}>
                    Priority {sortField === "priority" ? (sortOrder === "asc" ? "<" : ">") : ""}
                    </th>
                    <th onClick={() => handleSort("duedate")}
                    style={{width: "10%", border: "1px solid black", padding: "10px", cursor: "pointer"}}>
                    Due Date {sortField === "duedate" ? (sortOrder === "asc" ? "<" : ">") : ""}
                    </th>
                    <th style={{width: "10%", border: "1px solid black", padding: "10px"}}>
                    Actions
                    </th>
                </tr>
            </thead>

            <tbody>
            {(paginatedTasks as Task[]).map((task: Task) => { 
                const isCompleted = task.flag;
                return (
                <tr key={task.id} style={{backgroundColor: isCompleted ? "white" : task.rowColor, textDecoration: isCompleted ? "line-through" : "none"}}>
                    <td
                    style={{border:"1px solid black", padding: "10px", textAlign: "center"}}>
                        <input 
                        type= "checkbox"
                        checked={isCompleted}
                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                        />
                    </td>
                    <td style={{border:"1px solid black", padding: "10px"}}>{task.name}</td>
                    <td style={{border:"1px solid black", padding: "10px"}}>{task.priority}</td>
                    <td style={{border:"1px solid black", padding: "10px"}}>{task.dueDate}</td>
                    <td style={{border:"1px solid black", padding: "10px"}}>
                        {!isCompleted && (
                            <>
                                <button onClick={() => handleEditClick(task)}>Edit</button>
                                <button onClick={() => handleRemoveClick(task)}>Remove</button> 
                            </>
                        )}
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>


        {/* Design of the modal for editing a task */}
        {isEditModalOpen && (
            <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5", zIndex: 999,}}>
                <div style={{position: "fixed", top: "40%", left: "50%", transform: "translate(-50%, -50%", zIndex: 1000, backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1", width: "400px", maxWidth: "90%",}}>
                    <h2>Edit Task</h2>
                    <input
                        type="text"
                        value={editedTask.name}
                        onChange={(e) => setEditedTask({...editedTask, name: e.target.value})}
                        placeholder= "Name"
                    />
                    <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <input
                        type="data"
                        value={editedTask.deadline}
                        onChange={(e) => setEditedTask({...editedTask, deadline: e.target.value})}
                    />
                    <div>
                        <button onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        <button onClick={UpdateTasks}>Save</button>
                    </div>
                </div>
            </div>
        )}


        {/* Design of the modal of confirmation for removing a task */}
        {isDeleteModalOpen && (
            <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5", zIndex: 999,}}>
                <div style={{position: "fixed", top: "40%", left: "50%", transform: "translate(-50%, -50%", zIndex: 1000, backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1", width: "400px", maxWidth: "90%",}}>
                    <h2>Are you sure you want to delete this task?</h2>
                    <p>{selectedTask?.name}   {selectedTask?.priority}  {selectedTask?.dueDate}</p>
                    <div style={{}}>
                        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                        <button onClick={DeleteTasks}>Delete</button>
                    </div>
                </div>
            </div>
        )}


        {/*Pagination element */}
        <div style={{ top: "930px", left: "800px", textAlign: "center", position: "absolute"}}>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previuos
            </button>
            <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPage}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPage}>
                Next
            </button>
        </div>


        {/* Box for show the average time of the tasks */}
        <AveragesBox/>



        </div>

    );
};

export default DeployTable;
