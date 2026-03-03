"use client";

import { useState } from "react";
import { useHotlines } from "../providers/HotlinesProvider";
import { addHotline, updateHotline } from "@/app/admin/actions";
import { toast } from "sonner";

export function useHotlinesForm() {
    const { setIsAddModalOpen, editingData, setEditingData } = useHotlines();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            if (editingData) {
                await updateHotline(editingData.id, formData);
                toast.success("Hotline updated successfully!");
            } else {
                await addHotline(formData);
                toast.success("Hotline added successfully!");
            }
            setIsAddModalOpen(false);
            setEditingData(null);
        } catch (error) {
            console.error("Error saving hotline:", error);
            toast.error("Failed to save hotline. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, loading };
}
