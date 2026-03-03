"use client";

import { useProjects } from "../providers/ProjectsProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";

export function ProjectsFilters() {
    const { searchTerm, setSearchTerm, setIsAddModalOpen, selectedCategory, setSelectedCategory, selectedStatus, setSelectedStatus } = useProjects();

    const categories = ["Infrastructure", "Health", "Education", "Social Services", "Economic", "Environment", "Other"];
    const statuses = ["Planned", "Ongoing", "Completed", "Suspended"];

    return (
        <div className="p-6 border-b border-slate-200 dark:border-[#2a3040] bg-white dark:bg-[#151b2b]">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                <div className="flex flex-col sm:flex-row flex-1 gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-11 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] focus-visible:ring-blue-500"
                        />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-[160px] h-11 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#151b2b] border-slate-200 dark:border-[#2a3040]">
                            <SelectItem value="All">All Categories</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-full sm:w-[150px] h-11 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#151b2b] border-slate-200 dark:border-[#2a3040]">
                            <SelectItem value="All">All Statuses</SelectItem>
                            {statuses.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full lg:w-auto h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 px-6 rounded-xl transition-all hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>
        </div>
    );
}
