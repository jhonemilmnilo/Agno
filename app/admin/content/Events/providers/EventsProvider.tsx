"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EventsContextType {
    events: any[];
    setEvents: (data: any[]) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (open: boolean) => void;
    editingData: any | null;
    setEditingData: (data: any | null) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children, initialData }: { children: ReactNode; initialData: any[] }) {
    const [events, setEvents] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<any | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <EventsContext.Provider
            value={{
                events,
                setEvents,
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
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (context === undefined) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}
