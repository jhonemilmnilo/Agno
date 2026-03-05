"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Resident = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    dateOfBirth: Date;
    gender: string;
    civilStatus: string;
    bloodType: string | null;
    contactNumber: string | null;
    email: string | null;
    barangay: string;
    address: string;
    occupation: string | null;
    emergencyContactName: string | null;
    emergencyContactNumber: string | null;
    imageUrl: string | null;
    registeredAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

type ViewMode = "table" | "cards";

type ResidentContextType = {
    residents: Resident[];
    setResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedBarangay: string;
    setSelectedBarangay: (barangay: string) => void;
    selectedGender: string;
    setSelectedGender: (gender: string) => void;
    isAddModalOpen: boolean;
    setIsAddModalOpen: (isOpen: boolean) => void;
    editingData: Resident | null;
    setEditingData: (data: Resident | null) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
};

const ResidentContext = createContext<ResidentContextType | undefined>(undefined);

export function ResidentProvider({
    children,
    initialResidents
}: {
    children: ReactNode;
    initialResidents: Resident[]
}) {
    const [residents, setResidents] = useState<Resident[]>(initialResidents);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("All");
    const [selectedGender, setSelectedGender] = useState("All");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<Resident | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("table");

    return (
        <ResidentContext.Provider value={{
            residents,
            setResidents,
            searchQuery,
            setSearchQuery,
            selectedBarangay,
            setSelectedBarangay,
            selectedGender,
            setSelectedGender,
            isAddModalOpen,
            setIsAddModalOpen,
            editingData,
            setEditingData,
            viewMode,
            setViewMode
        }}>
            {children}
        </ResidentContext.Provider>
    );
}

export function useResident() {
    const context = useContext(ResidentContext);
    if (context === undefined) {
        throw new Error("useResident must be used within a ResidentProvider");
    }
    return context;
}
