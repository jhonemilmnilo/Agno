"use client";

import { useState, FormEvent } from "react";
import { addTourismSpot, updateTourismSpot } from "@/app/admin/actions";
import { useTourism } from "../providers/TourismProvider";

export function useTourismForm() {
    const { setIsAddModalOpen, editingData, setEditingData } = useTourism();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            let res;
            if (editingData) {
                res = await updateTourismSpot(editingData.id, formData);
            } else {
                res = await addTourismSpot(formData);
            }

            if (res?.success) {
                setEditingData(null);
                setIsAddModalOpen(false);
            } else {
                alert(res?.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error saving tourism spot:", error);
            alert("An error occurred while saving.");
        } finally {
            setLoading(false);
        }
    }

    return {
        handleSubmit,
        loading
    };
}
