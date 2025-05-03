import BlackBorderBox from "./ui/BlackBorderBox";
import DeployTable from "./ui/DeployTable";
import NewToDoButton from './ui/NewToDoButton';
import { SearchProvider } from './context/SearchContext';
import { AverageTimeProvider } from './context/AverageTimeContext';
import './App.css';

/**
 * App Component
 * 
 * This is the root component of the application. It integrates the following:
 * - `SearchProvider`: Provides context for managing task search functionality.
 * - `AverageTimeProvider`: Provides context for managing average task completion times.
 * - `BlackBorderBox`: A container for task filtering elements (search box, priority, and state filters).
 * - `NewToDoButton`: A button to open a modal for creating new tasks.
 * - `DeployTable`: A table displaying tasks with sorting, pagination, and management features.
 * 
 * @returns {JSX.Element} The main application layout with task management features.
 */
function App() {
  return (
    <div style={{ padding: "20px" }}> 
      {/* Wrapping the application in context providers */}
      <SearchProvider>
        <AverageTimeProvider>
          {/* Render the task filtering container */}
          <BlackBorderBox />
          {/* Render the button to add a new task */}
          <NewToDoButton />
          {/* Render the table for displaying and managing tasks */}
          <DeployTable />
        </AverageTimeProvider>
      </SearchProvider>
    </div>  
  );
}

export default App;

