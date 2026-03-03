"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

async function processImageUpload(formData: FormData): Promise<string | null> {
    const file = formData.get("imageFile") as File | null;
    let imageUrl = formData.get("imageUrl") as string | null;

    if (file && file.size > 0 && file.name !== "undefined") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        const filepath = path.join(process.cwd(), "public/uploads", filename);
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`;
    }

    // Return the new image URL, or the existing one if no new file was uploaded
    return imageUrl || null;
}

export async function addDining(formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const newDining = await prisma.dining.create({
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                cuisineType: formData.get("cuisineType") as string,
                openingHours: formData.get("openingHours") as string,
                contactNumber: formData.get("contactNumber") as string,
                facebookUrl: formData.get("facebookUrl") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
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

export async function deleteDining(id: string) {
    try {
        await prisma.dining.delete({
            where: { id }
        });
        revalidatePath("/admin/dining");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete dining:", error);
        return { success: false, error: "Failed to delete dining entry." };
    }
}

export async function updateDining(id: string, formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const updatedDining = await prisma.dining.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                cuisineType: formData.get("cuisineType") as string,
                openingHours: formData.get("openingHours") as string,
                contactNumber: formData.get("contactNumber") as string,
                facebookUrl: formData.get("facebookUrl") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
            },
        });

        revalidatePath("/admin/dining");
        return { success: true, dining: updatedDining };
    } catch (error) {
        console.error("Failed to update dining:", error);
        return { success: false, error: "Failed to update dining entry." };
    }
}

export async function toggleDiningStatus(id: string, isPublished: boolean) {
    try {
        await prisma.dining.update({
            where: { id },
            data: { isPublished }
        });
        revalidatePath("/admin/dining");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update dining status." };
    }
}

// ----------------------------------------
// ACCOMMODATION (TULUYAN) ACTIONS
// ----------------------------------------

export async function addAccommodation(formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const newAccommodation = await prisma.accommodation.create({
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                type: formData.get("type") as string,
                priceRange: formData.get("priceRange") as string,
                amenities: formData.get("amenities") as string,
                contactNumber: formData.get("contactNumber") as string,
                websiteUrl: formData.get("websiteUrl") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
                isPublished: true,
            },
        });

        revalidatePath("/admin/accommodation");
        return { success: true, accommodation: newAccommodation };
    } catch (error) {
        console.error("Failed to add accommodation:", error);
        return { success: false, error: "Failed to create accommodation entry." };
    }
}

export async function deleteAccommodation(id: string) {
    try {
        await prisma.accommodation.delete({
            where: { id }
        });
        revalidatePath("/admin/accommodation");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete accommodation:", error);
        return { success: false, error: "Failed to delete accommodation entry." };
    }
}

export async function updateAccommodation(id: string, formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const updatedAccommodation = await prisma.accommodation.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                type: formData.get("type") as string,
                priceRange: formData.get("priceRange") as string,
                amenities: formData.get("amenities") as string,
                contactNumber: formData.get("contactNumber") as string,
                websiteUrl: formData.get("websiteUrl") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
            },
        });

        revalidatePath("/admin/accommodation");
        return { success: true, accommodation: updatedAccommodation };
    } catch (error) {
        console.error("Failed to update accommodation:", error);
        return { success: false, error: "Failed to update accommodation entry." };
    }
}

export async function toggleAccommodationStatus(id: string, isPublished: boolean) {
    try {
        await prisma.accommodation.update({
            where: { id },
            data: { isPublished }
        });
        revalidatePath("/admin/accommodation");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update accommodation status." };
    }
}

// ----------------------------------------
// TOURISM SPOT (PLACE TO VISIT) ACTIONS
// ----------------------------------------

export async function addTourismSpot(formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const newSpot = await prisma.tourismSpot.create({
            data: {
                name: formData.get("name") as string,
                category: formData.get("category") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                entranceFee: formData.get("entranceFee") as string,
                bestTimeToVisit: formData.get("bestTimeToVisit") as string,
                contactNumber: formData.get("contactNumber") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
                isPublished: true,
            },
        });

        revalidatePath("/admin/tourism");
        return { success: true, tourismSpot: newSpot };
    } catch (error) {
        console.error("Failed to add tourism spot:", error);
        return { success: false, error: "Failed to create tourism spot entry." };
    }
}

export async function deleteTourismSpot(id: string) {
    try {
        await prisma.tourismSpot.delete({
            where: { id }
        });
        revalidatePath("/admin/tourism");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete tourism spot:", error);
        return { success: false, error: "Failed to delete tourism spot entry." };
    }
}

export async function updateTourismSpot(id: string, formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const updatedSpot = await prisma.tourismSpot.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                category: formData.get("category") as string,
                description: formData.get("description") as string,
                address: formData.get("address") as string,
                entranceFee: formData.get("entranceFee") as string,
                bestTimeToVisit: formData.get("bestTimeToVisit") as string,
                contactNumber: formData.get("contactNumber") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
            },
        });

        revalidatePath("/admin/tourism");
        return { success: true, tourismSpot: updatedSpot };
    } catch (error) {
        console.error("Failed to update tourism spot:", error);
        return { success: false, error: "Failed to update tourism spot entry." };
    }
}

export async function toggleTourismSpotStatus(id: string, isPublished: boolean) {
    try {
        await prisma.tourismSpot.update({
            where: { id },
            data: { isPublished }
        });
        revalidatePath("/admin/tourism");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update tourism spot status." };
    }
}

// ----------------------------------------
// EVENT ACTIONS
// ----------------------------------------

export async function addEvent(formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const newEvent = await prisma.event.create({
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                startDate: new Date(formData.get("startDate") as string),
                endDate: new Date(formData.get("endDate") as string),
                venueName: formData.get("venueName") as string,
                address: formData.get("address") as string,
                contactNumber: formData.get("contactNumber") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
                isPublished: true,
            },
        });

        revalidatePath("/admin/events");
        return { success: true, event: newEvent };
    } catch (error) {
        console.error("Failed to add event:", error);
        return { success: false, error: "Failed to create event entry." };
    }
}

export async function updateEvent(id: string, formData: FormData) {
    try {
        const imageUrl = await processImageUpload(formData);

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                startDate: new Date(formData.get("startDate") as string),
                endDate: new Date(formData.get("endDate") as string),
                venueName: formData.get("venueName") as string,
                address: formData.get("address") as string,
                contactNumber: formData.get("contactNumber") as string,
                imageUrl: imageUrl,
                latitude: formData.get("latitude") ? parseFloat(formData.get("latitude") as string) : null,
                longitude: formData.get("longitude") ? parseFloat(formData.get("longitude") as string) : null,
                googleMapsUrl: formData.get("googleMapsUrl") as string,
            },
        });

        revalidatePath("/admin/events");
        return { success: true, event: updatedEvent };
    } catch (error) {
        console.error("Failed to update event:", error);
        return { success: false, error: "Failed to update event entry." };
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({
            where: { id }
        });
        revalidatePath("/admin/events");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { success: false, error: "Failed to delete event entry." };
    }
}

export async function toggleEventStatus(id: string, isPublished: boolean) {
    try {
        await prisma.event.update({
            where: { id },
            data: { isPublished }
        });
        revalidatePath("/admin/events");
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update event status." };
    }
}


