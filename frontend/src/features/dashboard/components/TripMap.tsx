import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GPSPoint } from '../../../types/trip.types';
import {
    sortGPSPointsByTimestamp,
    validateGPSPoints,
    detectOverspeedSections,
    detectStoppages,
    detectIdlingPoints,
} from '../../../utils/mapUtils';
import { formatDuration, formatSpeed } from '../../../utils/tripUtils';
import '../styles/map.css';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface TripMapProps {
    gpsPoints: GPSPoint[];
    tripName: string;
    speedLimit?: number;
    showStoppages?: boolean;
    showIdling?: boolean;
    color?: string;
    activePointIndex?: number;
}

const TripMap: React.FC<TripMapProps> = ({
    gpsPoints,
    tripName,
    speedLimit = 80,
    showStoppages = true,
    showIdling = true,
    color = '#3B82F6',
    activePointIndex,
}) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const vehicleMarkerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Initialize map only once
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: [0, 0],
                zoom: 13,
                zoomControl: true,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(mapRef.current);
        }

        // Clear existing layers (except tile layer and vehicle marker)
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) return;
            if (layer === vehicleMarkerRef.current) return;
            mapRef.current?.removeLayer(layer);
        });

        // Validate and sort GPS points
        const validPoints = validateGPSPoints(gpsPoints);
        if (validPoints.length === 0) return;

        const sortedPoints = sortGPSPointsByTimestamp(validPoints);
        const currentIndex = activePointIndex !== undefined ? activePointIndex : sortedPoints.length - 1;
        
        // --- DRAWING LOGIC ---

        if (sortedPoints.length > 1) {
            // Draw FULL historical path in a faint color (Ghost Path)
            const fullCoords: [number, number][] = sortedPoints.map(p => [p.latitude, p.longitude]);
            L.polyline(fullCoords, { color: '#CBD5E1', weight: 3, opacity: 0.4, dashArray: '5, 10' }).addTo(mapRef.current!);

            // Points up to current playback index
            const traveledPoints = sortedPoints.slice(0, currentIndex + 1);

            if (traveledPoints.length > 1) {
                const overspeedSections = detectOverspeedSections(traveledPoints, speedLimit);
                const overspeedIndices = new Set<number>();

                overspeedSections.forEach(section => {
                    for (let i = section.startIndex; i <= section.endIndex; i++) {
                        overspeedIndices.add(i);
                    }
                });

                // Draw main path segments for traveled part
                let currentSegment: [number, number][] = [];
                for (let i = 0; i < traveledPoints.length; i++) {
                    const point = traveledPoints[i];
                    if (!overspeedIndices.has(i)) {
                        currentSegment.push([point.latitude, point.longitude]);
                    } else {
                        if (currentSegment.length > 1) {
                            L.polyline(currentSegment, { color, weight: 5, opacity: 0.9 }).addTo(mapRef.current!);
                        }
                        currentSegment = [[point.latitude, point.longitude]]; // Start new segment from overspeed end
                    }
                }
                if (currentSegment.length > 1) {
                    L.polyline(currentSegment, { color, weight: 5, opacity: 0.9 }).addTo(mapRef.current!);
                }

                // Draw overspeed sections in red
                overspeedSections.forEach(section => {
                    const coords: [number, number][] = section.points.map(p => [p.latitude, p.longitude]);
                    L.polyline(coords, { color: '#EF4444', weight: 6, opacity: 1.0 })
                        .addTo(mapRef.current!)
                        .bindPopup(`
                            <div class="map-popup overspeed">
                              <h4>⚠️ Overspeed Section</h4>
                              <p><strong>Max Speed:</strong> ${formatSpeed(section.maxSpeed)}</p>
                              <p><strong>Points:</strong> ${section.points.length}</p>
                            </div>
                        `);
                });
            }

            // Add start/end markers
            const startIcon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin start">S</div>', iconSize: [30, 42], iconAnchor: [15, 42] });
            const endIcon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin end">E</div>', iconSize: [30, 42], iconAnchor: [15, 42] });

            L.marker([sortedPoints[0].latitude, sortedPoints[0].longitude], { icon: startIcon }).addTo(mapRef.current!).bindPopup('Trip Start');
            L.marker([sortedPoints[sortedPoints.length - 1].latitude, sortedPoints[sortedPoints.length - 1].longitude], { icon: endIcon }).addTo(mapRef.current!).bindPopup('Trip End');

            // Add stoppages
            if (showStoppages) {
                detectStoppages(sortedPoints).forEach((s, i) => {
                    const icon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin stoppage">P</div>', iconSize: [30, 42], iconAnchor: [15, 42] });
                    L.marker([s.location.lat, s.location.lng], { icon }).addTo(mapRef.current!)
                        .bindPopup(`🅿️ Stoppage #${i+1}<br>Duration: ${formatDuration(s.duration)}`);
                });
            }

            // Add idling
            if (showIdling) {
                detectIdlingPoints(sortedPoints).forEach((id, i) => {
                    const icon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin idling">I</div>', iconSize: [30, 42], iconAnchor: [15, 42] });
                    L.marker([id.location.lat, id.location.lng], { icon }).addTo(mapRef.current!)
                        .bindPopup(`⏸️ Idling #${i+1}<br>Duration: ${formatDuration(id.duration)}`);
                });
            }

            // Auto-fit map ONLY on initial load or if not replaying
            if (activePointIndex === undefined || activePointIndex === sortedPoints.length - 1) {
                const bounds = L.latLngBounds(sortedPoints.map(p => [p.latitude, p.longitude]));
                mapRef.current.fitBounds(bounds, { padding: [50, 50] });
            }
        } else {
            // Single point case
            const point = sortedPoints[0];
            mapRef.current.setView([point.latitude, point.longitude], 15);
        }

        // --- LIVE VEHICLE MARKER ---
        const activePoint = sortedPoints[currentIndex];
        const vehicleIcon = L.divIcon({
            className: 'live-vehicle-icon',
            html: `
                <div style="background: #4F46E5; width: 20px; height: 20px; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 15px rgba(79, 70, 229, 0.6); position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="position: absolute; top: -8px; left: -8px; width: 36px; height: 36px; background: rgba(79, 70, 229, 0.2); border-radius: 50%; animation: pulse-anim 2s infinite;"></div>
                    <div style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 8px solid white; transform: rotate(${activePoint.heading || 0}deg);"></div>
                </div>
                <style>@keyframes pulse-anim { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }</style>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        if (vehicleMarkerRef.current) {
            vehicleMarkerRef.current.setLatLng([activePoint.latitude, activePoint.longitude]);
            vehicleMarkerRef.current.setIcon(vehicleIcon);
        } else {
            vehicleMarkerRef.current = L.marker([activePoint.latitude, activePoint.longitude], { 
                icon: vehicleIcon, 
                zIndexOffset: 1000 
            }).addTo(mapRef.current!);
        }

        vehicleMarkerRef.current.bindTooltip(`
            <div style="padding: 4px 8px; font-weight: 600;">
                ${formatSpeed(activePoint.speed)}<br>
                <span style="font-size: 10px; color: #64748b;">${new Date(activePoint.timestamp).toLocaleTimeString()}</span>
            </div>
        `, { permanent: false, direction: 'top' });

    }, [gpsPoints, tripName, speedLimit, showStoppages, showIdling, color, activePointIndex]);


    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="trip-map-container" style={{ position: 'relative' }}>
            {/* Live Status Badge */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '60px',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: gpsPoints.length > 0 ? '#48bb78' : '#cbd5e0',
                    boxShadow: gpsPoints.length > 0 ? '0 0 8px #48bb78' : 'none'
                }}></div>
                <span style={{ color: '#4a5568' }}>
                    {gpsPoints.length > 0 ? `LIVE: Receiving Points (${gpsPoints.length})` : 'WAITING FOR DATA...'}
                </span>
            </div>
            <div ref={mapContainerRef} className="trip-map" />
        </div>
    );
};

export default TripMap;
