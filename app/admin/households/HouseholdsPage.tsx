"use client";

import { useHousehold } from "./providers";
import {
    HouseholdCards,
    HouseholdFilters,
    HouseholdTable,
    AddHouseholdModal,
    HouseholdMapView
} from "./components";
import { Button } from "@/components/ui/button";
import { Plus, Home, Navigation, Map } from "lucide-react";

export function HouseholdsPage() {
    const { setIsAddModalOpen, viewMode } = useHousehold();

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#151b2b] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-[#2a3040] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                            <Map className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        Household Map
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg max-w-2xl font-medium">
                        Manage and visualize every household in Agno for resource distribution, risk assessment, and census tracking.
                    </p>
                </div>
                <div className="flex gap-3 relative z-10 w-full md:w-auto">
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 h-12 px-6 rounded-xl font-bold transition-all hover:scale-[1.02]"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Household
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                <HouseholdCards />

                <div className="bg-white dark:bg-[#151b2b] p-6 rounded-2xl border border-slate-200 dark:border-[#2a3040] shadow-sm">
                    <HouseholdFilters />

                    {viewMode === "map" ? (
                        <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
                            <HouseholdMapView />
                        </div>
                    ) : (
                        <div className="mt-6 animate-in fade-in duration-500">
                            <HouseholdTable />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AddHouseholdModal />
        </div>
    );
}
