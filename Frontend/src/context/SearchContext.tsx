import React, { createContext, useState, ReactNode } from "react";
import { Task } from "../types/Task";

/**
 * Context type definition for SearchContext.
 */
type SearchContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    nameSearch: string;
    prioritySearch: string;
    flagSearch: string;
    setNameSearch: (text: string) => void;
    setPrioritySearch: (priority: string) => void;
    setFlagSearch: (flag: string) => void;
};

/**
 * Creates a React context for managing task search state.
 */
const SearchContext = createContext<SearchContextType>({
    tasks: [],
    setTasks: () => {},
    nameSearch: "",
    prioritySearch: "All",
    flagSearch: "All",
    setNameSearch: () => {},
    setPrioritySearch: () => {},
    setFlagSearch: () => {},
});

type SearchProviderProps = {
    children: ReactNode;
};

/**
 * Provider component for SearchContext.
 */
export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nameSearch, setNameSearch] = useState<string>("");
    const [prioritySearch, setPrioritySearch] = useState<string>("All");
    const [flagSearch, setFlagSearch] = useState<string>("All");

    return (
        <SearchContext.Provider
            value={{
                tasks,
                setTasks,
                nameSearch,
                prioritySearch,
                flagSearch,
                setNameSearch,
                setPrioritySearch,
                setFlagSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;

