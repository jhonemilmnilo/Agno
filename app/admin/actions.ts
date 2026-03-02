"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function addDining(data: any) {
    try {
        const newDining = await prisma.dining.create({
            data: {
                name: data.name,
                description: data.description,
                address: data.address,
                cuisineType: data.cuisineType,
                openingHours: data.openingHours,
                contactNumber: data.contactNumber,
                facebookUrl: data.facebookUrl,
                imageUrl: data.imageUrl,
                latitude: data.latitude ? parseFloat(data.latitude) : null,
                longitude: data.longitude ? parseFloat(data.longitude) : null,
                googleMapsUrl: data.googleMapsUrl,
                isPublished: true,
            },
        });

        revalidatePath("/admin/dining");
        return { success: true, dining: newDining };
    } catch (error) {
        console.error("Failed to add dining:", error);
        return { success: false, error: "Failed to create dining entry." };
    }
}
