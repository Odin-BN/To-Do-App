import React, { createContext, useState, ReactNode } from 'react';
import { Task } from '../ui/Task';

//Global context obtain the list of tasks filter by Task Name, Priority and State

type SearchContextType = {   //type?
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    NameSearch: string;
    PrioritySearch: string;
    FlagSearch: string
    setnameSearch: (text: string) => void;
    setprioritySearch: (PrioritySearch: string) => void;
    setflagSearch: (FlagSearch: string) => void;
    fetchTasks: () => void;
};

const SearchContext = createContext<SearchContextType>({
    tasks: [],
    setTasks: () => {},
    NameSearch: "",
    PrioritySearch: "All",
    FlagSearch: "All",
    setnameSearch: () => {},
    setprioritySearch: () => {},
    setflagSearch: () => {},
    fetchTasks: () => {},
});



type SearchProviderProps = {
    children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [NameSearch, setnameSearch] = useState<string>("");
    const [PrioritySearch, setprioritySearch] = useState<string>("All");
    const [FlagSearch, setflagSearch] = useState<string>("All");

    const fetchTasks = async () => {
        let searchUrl = "http://localhost:9090/todos?" //PrioritySearch=Medium

        if (NameSearch) {
            searchUrl += `NameSearch=${encodeURIComponent(NameSearch)}&`;
        }
        if (PrioritySearch && PrioritySearch !== "All") {
            searchUrl += `PrioritySearch=${encodeURIComponent(PrioritySearch)}&`;
        }
        if (FlagSearch && FlagSearch !== "All"){
            searchUrl += `FlagSearch=${encodeURIComponent(FlagSearch)}`;
        }

        searchUrl = searchUrl.replace(/&$/, "");

        try {
            const response = await fetch(searchUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener las tareas");
            }

            const data: Task[] = await response.json();
            console.log("Datos obtenidos:", data);
            setTasks(data);
        }   catch (error) {
            console.error("Error en la busqeuda:", error);
        }

    };

    return (
        <SearchContext.Provider value= {{ tasks, setTasks, NameSearch, PrioritySearch, FlagSearch, setnameSearch, setprioritySearch, setflagSearch, fetchTasks}}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;

