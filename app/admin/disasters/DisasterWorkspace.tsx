"use client";

import { DisasterProvider } from "./providers/DisasterProvider";
import { HouseholdProvider, Household } from "../households/providers/HouseholdProvider";
import { DisasterMapView } from "./components/DisasterMapView";
import { DisasterSidebar } from "./components/DisasterSidebar";
import { Map as MapIcon, ShieldAlert } from "lucide-react";

export function DisasterWorkspace({ initialHouseholds }: { initialHouseholds: Household[] }) {
    return (
        <HouseholdProvider initialHouseholds={initialHouseholds}>
            <DisasterProvider>
                <div className="flex flex-col h-[calc(100vh-100px)] p-6 gap-6">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <ShieldAlert className="w-8 h-8 text-blue-600" />
                                Hazard Mapping
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">
                                DRRMO Interactive Disaster Zone Studio
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</p>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Live Editor (Active)</p>
                            </div>
                            <div className="w-12 h-12 bg-white dark:bg-[#1a1f2e] border border-slate-200 dark:border-[#2a3040] rounded-2xl flex items-center justify-center shadow-sm">
                                <MapIcon className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Workspace */}
                    <div className="flex-1 flex gap-8 min-h-0">
                        {/* Map Area */}
                        <div className="flex-1 min-w-0">
                            <DisasterMapView />
                        </div>

                        {/* Control Side Panel */}
                        <DisasterSidebar />
                    </div>
                </div>
            </DisasterProvider>
        </HouseholdProvider>
    );
}
