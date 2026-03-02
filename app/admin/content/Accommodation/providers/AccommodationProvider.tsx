"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccommodationContextType {
    accommodationData: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (isOpen: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
}

const AccommodationContext = createContext<AccommodationContextType | undefined>(undefined);

export function AccommodationProvider({
    children,
    initialData
}: {
    children: React.ReactNode;
    initialData: any[]
}) {
    const [accommodationData, setAccommodationData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);

    useEffect(() => {
        setAccommodationData(initialData);
    }, [initialData]);

    return (
        <AccommodationContext.Provider
            value={{
                accommodationData,
                searchTerm,
                setSearchTerm,
                isAddModalOpen,
                setIsAddModalOpen,
                editingData,
                setEditingData,
            }}
        >
            {children}
        </AccommodationContext.Provider>
    );
}

export function useAccommodation() {
    const context = useContext(AccommodationContext);
    if (context === undefined) {
        throw new Error("useAccommodation must be used within an AccommodationProvider");
    }
    return context;
}
