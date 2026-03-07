"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Loader2, Trash2, Maximize2, Plus } from "lucide-react";
import { useDisaster, DisasterZone } from "../providers/DisasterProvider";
import { addDisasterZone, updateDisasterZone, deleteDisasterZone } from "../../actions";
import { toast } from "sonner";
import type { GeoJsonObject } from "geojson";

// Import react-leaflet dynamically to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false, loading: () => <MapLoading /> });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Polygon = dynamic(() => import("react-leaflet").then(mod => mod.Polygon), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(mod => mod.GeoJSON), { ssr: false });

// This component handles the auto-centering when the border loads
function MapController({ geojson }: { geojson: any }) {
    const map = (window as any).L ? (window as any).Map : null; // This is a bit tricky with dynamic imports
    // We'll use the useMap hook inside the component
    return null;
}

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
    const { zones, activeZoneId, setActiveZoneId, updateZone, removeZone } = useDisaster();
    const [agnoBorder, setAgnoBorder] = useState<GeoJsonObject | null>(null);
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
                html: "<div style='background-color: white; border: 2px solid #3b82f6; width: 12px; height: 12px; border-radius: 2px; box-shadow: 0 0 5px rgba(0,0,0,0.2)'></div>",
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });
            setIconsLoaded(true);
        });
    }, []);

    if (!mounted || !iconsLoaded) return <MapLoading />;

    const handleVertexDrag = async (zone: DisasterZone, shapeIdx: number, vertexIdx: number, latlng: { lat: number, lng: number }) => {
        const newShapes = [...zone.shapes];
        newShapes[shapeIdx] = [...newShapes[shapeIdx]];
        newShapes[shapeIdx][vertexIdx] = [latlng.lat, latlng.lng];

        updateZone(zone.id, { shapes: newShapes });
        await updateDisasterZone(zone.id, { shapes: newShapes });
    };

    const handleMidPointDrag = async (zone: DisasterZone, shapeIdx: number, insertIdx: number, latlng: { lat: number, lng: number }) => {
        const newShapes = [...zone.shapes];
        newShapes[shapeIdx] = [...newShapes[shapeIdx]];
        newShapes[shapeIdx].splice(insertIdx, 0, [latlng.lat, latlng.lng]);

        updateZone(zone.id, { shapes: newShapes });
        await updateDisasterZone(zone.id, { shapes: newShapes });
        toast.success("New side added!");
    };

    const handleAddArea = async (zone: DisasterZone) => {
        const center = [16.1158, 119.7997];
        const newShape: [number, number][] = [
            [center[0] + 0.005, center[1] - 0.005],
            [center[0] + 0.005, center[1] + 0.005],
            [center[0] - 0.005, center[1] + 0.005],
            [center[0] - 0.005, center[1] - 0.005]
        ];

        const newShapes = [...zone.shapes, newShape];
        updateZone(zone.id, { shapes: newShapes });
        await updateDisasterZone(zone.id, { shapes: newShapes });
        toast.success("New area added to this disaster type!");
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

    // Calculate the mask to hide areas outside Agno
    const maskPositions = useMemo(() => {
        if (!agnoBorder || (agnoBorder as any).type !== "Polygon") return null;

        const outerWorld = [
            [90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180],
        ];

        // GeoJSON uses [lng, lat], Leaflet uses [lat, lng]
        const agnoCoords = (agnoBorder as any).coordinates[0].map((coord: [number, number]) => [coord[1], coord[0]]);

        // Leaflet Polygon hole is an array of arrays
        return [outerWorld, agnoCoords];
    }, [agnoBorder]);

    // Use a component that will actually call fitBounds
    const FitBoundsComponent = () => {
        const map = (window as any).mapInstance;
        // This is a workaround since we need the map instance
        return null;
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
                            style={{ color: '#3b82f6', weight: 3, opacity: 1, fillOpacity: 0 }}
                        />
                    )}

                    {/* The "Show only for Agno" Mask */}
                    {maskPositions && (
                        <Polygon
                            positions={maskPositions as any}
                            pathOptions={{
                                fillColor: "#0f172a",
                                fillOpacity: 0.7,
                                weight: 0,
                                color: "transparent",
                                pane: "overlayPane"
                            }}
                        />
                    )}

                    {zones.map((zone) => {
                        const isActive = activeZoneId === zone.id;

                        if (!zone.shapes || !Array.isArray(zone.shapes)) return null;

                        return (
                            <div key={zone.id}>
                                {zone.shapes.map((shape: [number, number][], sIdx: number) => (
                                    <div key={`${zone.id}-s-${sIdx}`}>
                                        <Polygon
                                            positions={shape as any}
                                            pathOptions={{
                                                color: zone.riskColor,
                                                fillColor: zone.typeColor,
                                                fillOpacity: 0.4,
                                                weight: isActive ? 3 : 1
                                            }}
                                            eventHandlers={{
                                                click: (e) => {
                                                    (e as any).originalEvent.stopPropagation();
                                                    setActiveZoneId(zone.id);
                                                }
                                            }}
                                        >
                                            <Popup>
                                                <div className="p-3 min-w-[150px]">
                                                    <p className="font-bold text-lg mb-1">{zone.type}</p>
                                                    <p className="text-sm text-slate-500 mb-3">
                                                        Risk: <span style={{ color: zone.riskColor }} className="font-bold">{zone.riskLevel}</span>
                                                    </p>
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() => handleAddArea(zone)}
                                                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-bold"
                                                        >
                                                            <Plus className="w-3 h-3" /> Add Another Area
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(zone.id)}
                                                            className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-bold"
                                                        >
                                                            <Trash2 className="w-3 h-3" /> Remove Disaster
                                                        </button>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Polygon>

                                        {/* Editing Handles */}
                                        {isActive && (
                                            <>
                                                {/* Vertex Handles */}
                                                {shape.map((coord, vIdx) => (
                                                    <Marker
                                                        key={`${zone.id}-v-${sIdx}-${vIdx}`}
                                                        position={coord}
                                                        icon={HandleIcon}
                                                        draggable={true}
                                                        eventHandlers={{
                                                            dragend: (e) => handleVertexDrag(zone, sIdx, vIdx, e.target.getLatLng())
                                                        }}
                                                    />
                                                ))}

                                                {/* Mid-Point Edge Handles (more side to adjust) */}
                                                {shape.map((coord, vIdx) => {
                                                    const nextCoord = shape[(vIdx + 1) % shape.length];
                                                    const midPoint: [number, number] = [
                                                        (coord[0] + nextCoord[0]) / 2,
                                                        (coord[1] + nextCoord[1]) / 2
                                                    ];
                                                    return (
                                                        <Marker
                                                            key={`${zone.id}-m-${sIdx}-${vIdx}`}
                                                            position={midPoint}
                                                            icon={new (window as any).L.DivIcon({
                                                                className: 'mid-handle',
                                                                html: "<div style='background-color: white; border: 1px solid #3b82f6; width: 8px; height: 8px; border-radius: 50%; opacity: 0.6;'></div>",
                                                                iconSize: [8, 8],
                                                                iconAnchor: [4, 4]
                                                            })}
                                                            draggable={true}
                                                            eventHandlers={{
                                                                dragend: (e) => handleMidPointDrag(zone, sIdx, vIdx + 1, e.target.getLatLng())
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
}
