"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Hotline {
    id: string;
    name: string;
    category: string;
    mobileNumber: string | null;
    telephone: string | null;
    address: string | null;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface HotlinesContextType {
    hotlinesData: Hotline[];
    setHotlinesData: (data: Hotline[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: Hotline | null;
    setEditingData: (data: Hotline | null) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const HotlinesContext = createContext<HotlinesContextType | undefined>(undefined);

export function HotlinesProvider({ children, initialData }: { children: ReactNode; initialData: Hotline[] }) {
    const [hotlinesData, setHotlinesData] = useState<Hotline[]>(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<Hotline | null>(null);
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
