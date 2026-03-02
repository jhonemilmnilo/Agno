"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiningProvider, useDining } from "./providers/DiningProvider";
import { DiningCards } from "./components/cards";
import { DiningFilters } from "./components/filters";
import { DiningTable } from "./components/table";
import { AddDiningModal } from "./components/AddDiningModal";

function DiningDashboard() {
    const { setIsAddModalOpen } = useDining();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">Kainan (Dining) Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage all local restaurants and eateries in Agno.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-4 py-2 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Kainan
                    </Button>
                </motion.div>
            </div>

            <DiningCards />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white dark:bg-[#1e2330] border border-slate-200 dark:border-[#2a3040] rounded-xl overflow-hidden flex flex-col shadow-xl"
            >
                <DiningFilters />
                <DiningTable />
            </motion.div>

            <AddDiningModal />
        </div>
    );
}

export default function DiningPage({ diningData }: { diningData: any[] }) {
    return (
        <DiningProvider initialData={diningData}>
            <DiningDashboard />
        </DiningProvider>
    );
}
