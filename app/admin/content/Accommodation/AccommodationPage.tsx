"use client";

import { AccommodationProvider } from "./providers";
import {
    AccommodationCards,
    AccommodationFilters,
    AccommodationTable,
    AddAccommodationModal
} from "./components";
import { Home } from "lucide-react";

interface AccommodationPageProps {
    initialData: any[];
}

export function AccommodationPage({ initialData }: AccommodationPageProps) {
    return (
        <AccommodationProvider initialData={initialData}>
            <div className="p-8 space-y-8 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                            <Home size={14} />
                            <span>/</span>
                            <span>Content</span>
                            <span>/</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">Tuluyan (Stay)</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Tuluyan Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage resorts, hotels, and homestays in Agno.</p>
                    </div>
                </div>

                <AccommodationCards />

                <div className="bg-white dark:bg-[#151b2b] rounded-2xl border border-slate-200 dark:border-[#2a3040] shadow-sm overflow-hidden">
                    <AccommodationFilters />
                    <AccommodationTable />
                </div>

                <AddAccommodationModal />
            </div>
        </AccommodationProvider>
    );
}
