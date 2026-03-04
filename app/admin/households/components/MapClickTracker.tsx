"use client";

import { useMapEvents } from "react-leaflet";
import { useHousehold } from "../providers/HouseholdProvider";

export default function MapClickTracker() {
    const { setSelectedCoords, setIsAddModalOpen } = useHousehold();

    useMapEvents({
        click(e) {
            setSelectedCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
            setIsAddModalOpen(true);
        }
    });

    return null;
}
