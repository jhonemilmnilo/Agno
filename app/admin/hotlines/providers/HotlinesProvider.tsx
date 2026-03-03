"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface HotlinesContextType {
    hotlinesData: any[];
    setHotlinesData: (data: any[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const HotlinesContext = createContext<HotlinesContextType | undefined>(undefined);

export function HotlinesProvider({ children, initialData }: { children: ReactNode; initialData: any[] }) {
    const [hotlinesData, setHotlinesData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        setHotlinesData(initialData);
    }, [initialData]);

    return (
        <HotlinesContext.Provider
            value={{
                hotlinesData,
                setHotlinesData,
                searchTerm,
                setSearchTerm,
                isAddModalOpen,
                setIsAddModalOpen,
                editingData,
                setEditingData,
                selectedCategory,
                setSelectedCategory,
            }}
        >
            {children}
        </HotlinesContext.Provider>
    );
}

export function useHotlines() {
    const context = useContext(HotlinesContext);
    if (context === undefined) {
        throw new Error("useHotlines must be used within a HotlinesProvider");
    }
    return context;
}
