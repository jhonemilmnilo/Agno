"use client";

import React, { createContext, useContext, useState } from "react";

interface DiningContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (isOpen: boolean) => void;
    diningData: any[];
}

const DiningContext = createContext<DiningContextType | undefined>(undefined);

export function DiningProvider({ children, initialData }: { children: React.ReactNode; initialData: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [diningData, setDiningData] = useState(initialData);

    // Whenever initialData from server changes, you might want to sync, 
    // but for simple cases we just use it directly or let the server action revalidate the page.
    React.useEffect(() => {
        setDiningData(initialData);
    }, [initialData]);

    return (
        <DiningContext.Provider value={{ searchTerm, setSearchTerm, isAddModalOpen, setIsAddModalOpen, diningData }}>
            {children}
        </DiningContext.Provider>
    );
}

export function useDining() {
    const context = useContext(DiningContext);
    if (context === undefined) {
        throw new Error("useDining must be used within a DiningProvider");
    }
    return context;
}
