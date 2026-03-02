"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface TourismContextType {
    tourismData: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (isOpen: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const TourismContext = createContext<TourismContextType | undefined>(undefined);

export function TourismProvider({
    children,
    initialData
}: {
    children: React.ReactNode;
    initialData: any[]
}) {
    const [tourismData, setTourismData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        setTourismData(initialData);
    }, [initialData]);

    return (
        <TourismContext.Provider
            value={{
                tourismData,
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
        </TourismContext.Provider>
    );
}

export function useTourism() {
    const context = useContext(TourismContext);
    if (context === undefined) {
        throw new Error("useTourism must be used within a TourismProvider");
    }
    return context;
}
