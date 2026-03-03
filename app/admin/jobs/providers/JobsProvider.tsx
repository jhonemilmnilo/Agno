"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface JobsContextType {
    jobsData: any[];
    setJobsData: (data: any[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedDepartment: string;
    setSelectedDepartment: (department: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children, initialData }: { children: ReactNode; initialData: any[] }) {
    const [jobsData, setJobsData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState("All");

    useEffect(() => {
        setJobsData(initialData);
    }, [initialData]);

    return (
        <JobsContext.Provider
            value={{
                jobsData,
                setJobsData,
                searchTerm,
                setSearchTerm,
                isAddModalOpen,
                setIsAddModalOpen,
                editingData,
                setEditingData,
                selectedDepartment,
                setSelectedDepartment,
            }}
        >
            {children}
        </JobsContext.Provider>
    );
}

export function useJobs() {
    const context = useContext(JobsContext);
    if (context === undefined) {
        throw new Error("useJobs must be used within a JobsProvider");
    }
    return context;
}
