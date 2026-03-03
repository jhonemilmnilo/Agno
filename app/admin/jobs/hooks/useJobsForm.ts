"use client";

import { useState } from "react";
import { useJobs } from "../providers/JobsProvider";
import { addJob, updateJob } from "@/app/admin/actions";
import { toast } from "sonner";

export function useJobsForm() {
    const { setIsAddModalOpen, editingData, setEditingData } = useJobs();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            if (editingData) {
                await updateJob(editingData.id, formData);
                toast.success("Job updated successfully!");
            } else {
                await addJob(formData);
                toast.success("Job posted successfully!");
            }
            setIsAddModalOpen(false);
            setEditingData(null);
        } catch (error) {
            console.error("Error saving job:", error);
            toast.error("Failed to save job posting. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading };
}
