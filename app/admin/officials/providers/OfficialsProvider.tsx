"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface OfficialsContextType {
    officialsData: any[];
    setOfficialsData: (data: any[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedPosition: string;
    setSelectedPosition: (position: string) => void;
}

const OfficialsContext = createContext<OfficialsContextType | undefined>(undefined);

export function OfficialsProvider({ children, initialData }: { children: ReactNode; initialData: any[] }) {
    const [officialsData, setOfficialsData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedPosition, setSelectedPosition] = useState("All");

    useEffect(() => {
        setOfficialsData(initialData);
    }, [initialData]);

    return (
        <OfficialsContext.Provider
            value={{
                officialsData,
                setOfficialsData,
                searchTerm,
                setSearchTerm,
                isAddModalOpen,
                setIsAddModalOpen,
                editingData,
                setEditingData,
                selectedPosition,
                setSelectedPosition,
            }}
        >
            {children}
        </OfficialsContext.Provider>
    );
}

export function useOfficials() {
    const context = useContext(OfficialsContext);
    if (context === undefined) {
        throw new Error("useOfficials must be used within an OfficialsProvider");
    }
    return context;
}
