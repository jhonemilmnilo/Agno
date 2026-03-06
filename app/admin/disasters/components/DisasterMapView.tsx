"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Loader2, Trash2, Maximize2 } from "lucide-react";
import { useDisaster } from "../providers/DisasterProvider";
import { addDisasterZone, updateDisasterZone, deleteDisasterZone } from "../../actions";
import { toast } from "sonner";

// Import react-leaflet dynamically to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false, loading: () => <MapLoading /> });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Rectangle = dynamic(() => import("react-leaflet").then(mod => mod.Rectangle), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(mod => mod.GeoJSON), { ssr: false });

function MapLoading() {
    return (
        <div className="w-full h-[700px] bg-slate-100 dark:bg-[#151b2b] rounded-2xl flex flex-col items-center justify-center border border-slate-200 dark:border-[#2a3040]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading Map Workspace...</p>
        </div>
    );
}

// Fixed Leaflet Icons handled in a useEffect below
let HandleIcon: any;

export function DisasterMapView() {
    const { zones, refreshZones, activeZoneId, setActiveZoneId, updateZone, removeZone } = useDisaster();
    const [agnoBorder, setAgnoBorder] = useState<any>(null);
    const [mounted, setMounted] = useState(false);
    const [iconsLoaded, setIconsLoaded] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch('/agno-border.json')
            .then(res => res.json())
            .then(data => setAgnoBorder(data))
            .catch(err => console.error("Failed to load Agno border:", err));

        // Dynamically load Leaflet for custom icons
        import("leaflet").then(L => {
            HandleIcon = new L.DivIcon({
                className: 'custom-div-icon',
                html: "<div style='background-color: white; border: 2px solid #3b82f6; width: 12px; height: 12px; border-radius: 2px;'></div>",
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });
            setIconsLoaded(true);
        });
    }, []);

    if (!mounted || !iconsLoaded) return <MapLoading />;

    const handleResize = async (zone: any, corner: string, latlng: any) => {
        let newBounds = { north: zone.north, south: zone.south, east: zone.east, west: zone.west };

        if (corner === 'nw') { newBounds.north = latlng.lat; newBounds.west = latlng.lng; }
        if (corner === 'ne') { newBounds.north = latlng.lat; newBounds.east = latlng.lng; }
        if (corner === 'sw') { newBounds.south = latlng.lat; newBounds.west = latlng.lng; }
        if (corner === 'se') { newBounds.south = latlng.lat; newBounds.east = latlng.lng; }

        // Update local state for immediate feedback
        updateZone(zone.id, newBounds);

        // Update DB
        const result = await updateDisasterZone(zone.id, {
            type: zone.type,
            typeColor: zone.typeColor,
            riskLevel: zone.riskLevel,
            riskColor: zone.riskColor,
            north: newBounds.north,
            south: newBounds.south,
            east: newBounds.east,
            west: newBounds.west
        });

        if (!result.success) {
            toast.error("Failed to save zone changes.");
        }
    };

    const handleDelete = async (id: string) => {
        const result = await deleteDisasterZone(id);
        if (result.success) {
            removeZone(id);
            toast.success("Disaster zone removed.");
        } else {
            toast.error("Failed to delete zone.");
        }
    };

    return (
        <div className="w-full bg-white dark:bg-[#151b2b] p-4 rounded-3xl border border-slate-200 dark:border-[#2a3040] shadow-xl relative z-0 backdrop-blur-sm">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-[#2a3040] h-[700px] relative">
                <MapContainer
                    center={[16.1158, 119.7997]} // Centered on Agno
                    zoom={13}
                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                >
                    <TileLayer
                        attribution='Tiles &copy; Esri'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {agnoBorder && (
                        <GeoJSON
                            data={agnoBorder}
                            style={{ color: '#ffffff', weight: 1, opacity: 0.5, fillOpacity: 0.05 }}
                        />
                    )}

                    {zones.map((zone) => {
                        const isActive = activeZoneId === zone.id;
                        const bounds: [number, number][] = [[zone.south, zone.west], [zone.north, zone.east]];

                        return (
                            <div key={zone.id}>
                                <Rectangle
                                    bounds={bounds as any}
                                    pathOptions={{
                                        color: zone.riskColor,
                                        fillColor: zone.typeColor,
                                        fillOpacity: 0.4,
                                        weight: isActive ? 3 : 1
                                    }}
                                    eventHandlers={{
                                        click: () => setActiveZoneId(zone.id)
                                    }}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <p className="font-bold text-lg mb-1">{zone.type}</p>
                                            <p className="text-sm text-slate-500 mb-2">Risk: <span style={{ color: zone.riskColor }} className="font-bold">{zone.riskLevel}</span></p>
                                            <button
                                                onClick={() => handleDelete(zone.id)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors w-full justify-center"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete Zone
                                            </button>
                                        </div>
                                    </Popup>
                                </Rectangle>

                                {/* Resizing Handles if Active */}
                                {isActive && (
                                    <>
                                        {/* NW Handle */}
                                        <Marker
                                            position={[zone.north, zone.west]}
                                            icon={HandleIcon}
                                            draggable={true}
                                            eventHandlers={{ dragend: (e) => handleResize(zone, 'nw', e.target.getLatLng()) }}
                                        />
                                        {/* NE Handle */}
                                        <Marker
                                            position={[zone.north, zone.east]}
                                            icon={HandleIcon}
                                            draggable={true}
                                            eventHandlers={{ dragend: (e) => handleResize(zone, 'ne', e.target.getLatLng()) }}
                                        />
                                        {/* SW Handle */}
                                        <Marker
                                            position={[zone.south, zone.west]}
                                            icon={HandleIcon}
                                            draggable={true}
                                            eventHandlers={{ dragend: (e) => handleResize(zone, 'sw', e.target.getLatLng()) }}
                                        />
                                        {/* SE Handle */}
                                        <Marker
                                            position={[zone.south, zone.east]}
                                            icon={HandleIcon}
                                            draggable={true}
                                            eventHandlers={{ dragend: (e) => handleResize(zone, 'se', e.target.getLatLng()) }}
                                        />
                                    </>
                                )}
                            </div>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}
