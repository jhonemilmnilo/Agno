"use client";

import { useState, FormEvent } from "react";
import { addAccommodation, updateAccommodation } from "@/app/admin/actions";
import { useAccommodation } from "../providers/AccommodationProvider";

export function useAccommodationForm() {
    const { setIsAddModalOpen, editingData, setEditingData } = useAccommodation();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            let res;
            if (editingData) {
                res = await updateAccommodation(editingData.id, formData);
            } else {
                res = await addAccommodation(formData);
            }

            if (res?.success) {
                setEditingData(null);
                setIsAddModalOpen(false);
            } else {
                alert(res?.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error saving accommodation:", error);
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
