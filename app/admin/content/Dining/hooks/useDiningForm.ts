import { useState, FormEvent } from "react";
import { addDining, updateDining } from "@/app/admin/actions";
import { useDining } from "../providers/DiningProvider";

export function useDiningForm() {
    const [loading, setLoading] = useState(false);
    const { setIsAddModalOpen, editingData, setEditingData } = useDining();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            let res;
            if (editingData) {
                res = await updateDining(editingData.id, formData);
            } else {
                res = await addDining(formData);
            }

            if (res?.success) {
                setEditingData(null);
                setIsAddModalOpen(false);
            } else {
                alert(res?.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error saving dining:", error);
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
