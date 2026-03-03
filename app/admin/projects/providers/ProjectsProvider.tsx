"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProjectsContextType {
    projectsData: any[];
    setProjectsData: (data: any[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children, initialData }: { children: ReactNode; initialData: any[] }) {
    const [projectsData, setProjectsData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    useEffect(() => {
        setProjectsData(initialData);
    }, [initialData]);

    return (
        <ProjectsContext.Provider
            value={{
                projectsData,
                setProjectsData,
                searchTerm,
                setSearchTerm,
                isAddModalOpen,
                setIsAddModalOpen,
                editingData,
                setEditingData,
                selectedCategory,
                setSelectedCategory,
                selectedStatus,
                setSelectedStatus,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectsContext);
    if (context === undefined) {
        throw new Error("useProjects must be used within a ProjectsProvider");
    }
    return context;
}
