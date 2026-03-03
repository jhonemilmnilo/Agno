"use client";

import { useJobs } from "../providers/JobsProvider";
import { useJobsForm } from "../hooks/useJobsForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Briefcase, GraduationCap, Building2, Calendar } from "lucide-react";

export function AddJobModal() {
    const { isAddModalOpen, setIsAddModalOpen, editingData, setEditingData } = useJobs();
    const { handleSubmit, loading } = useJobsForm();

    const employmentTypes = ["Permanent", "Contractual", "Casual", "Job Order", "Part-Time"];

    const formatDateForInput = (dateString: string | undefined) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
    };

    return (
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open);
            if (!open) setEditingData(null);
        }}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f1117] border-slate-200 dark:border-[#2a3040] p-0 gap-0 shadow-2xl rounded-2xl">
                <DialogHeader className="p-8 pb-4 bg-slate-50/50 dark:bg-[#151b2b] sticky top-0 z-10 border-b border-slate-200 dark:border-[#2a3040]">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {editingData ? "Edit Job Posting" : "Post New Job"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                                Create an open application for a position in the municipal government.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Basic Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Job Title</Label>
                                <Input
                                    name="title"
                                    required
                                    defaultValue={editingData?.title}
                                    placeholder="e.g. Municipal Engineer"
                                    className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold flex items-center">
                                        <Building2 className="w-4 h-4 mr-1" /> Department
                                    </Label>
                                    <Input
                                        name="department"
                                        required
                                        defaultValue={editingData?.department}
                                        placeholder="e.g. Mayor's Office"
                                        className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Employment Type</Label>
                                    <Select name="employmentType" defaultValue={editingData?.employmentType || "Permanent"}>
                                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-[#151b2b] border-slate-200 dark:border-[#2a3040]">
                                            {employmentTypes.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold">Salary (Optional)</Label>
                                    <Input
                                        name="salary"
                                        defaultValue={editingData?.salary}
                                        placeholder="e.g. Salary Grade 11"
                                        className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300 font-bold flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" /> Deadline (Optional)
                                    </Label>
                                    <Input
                                        type="datetime-local"
                                        name="deadline"
                                        defaultValue={formatDateForInput(editingData?.deadline)}
                                        className="h-12 bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Long text requirements */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Job Description</Label>
                                <Textarea
                                    name="description"
                                    required
                                    defaultValue={editingData?.description}
                                    placeholder="Describe the responsibilities and duties of this role..."
                                    className="min-h-[100px] bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] resize-y"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-1" /> Qualifications
                                </Label>
                                <Textarea
                                    name="qualifications"
                                    required
                                    defaultValue={editingData?.qualifications}
                                    placeholder="Required education, experience, civil service eligibility..."
                                    className="min-h-[100px] bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] resize-y"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 dark:text-slate-300 font-bold">Document Requirements</Label>
                                <Textarea
                                    name="requirements"
                                    required
                                    defaultValue={editingData?.requirements}
                                    placeholder="List documents needed (e.g., PDS, Transcript of Records)..."
                                    className="min-h-[60px] bg-slate-50 dark:bg-[#1a1f2e] border-slate-200 dark:border-[#2a3040] resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-8 border-t border-slate-200 dark:border-[#2a3040] gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsAddModalOpen(false)}
                            className="h-12 px-8 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                            ) : (
                                editingData ? "Update Job" : "Post Job"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
