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
}

const TripMap: React.FC<TripMapProps> = ({
    gpsPoints,
    tripName,
    speedLimit = 80,
    showStoppages = true,
    showIdling = true,
    color = '#3B82F6',
}) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

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

        // Clear existing layers (except tile layer)
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) return;
            mapRef.current?.removeLayer(layer);
        });

        // Validate and sort GPS points
        const validPoints = validateGPSPoints(gpsPoints);
        if (validPoints.length === 0) return;

        const sortedPoints = sortGPSPointsByTimestamp(validPoints);

        // --- DRAWING LOGIC ---

        if (sortedPoints.length > 1) {
            const overspeedSections = detectOverspeedSections(sortedPoints, speedLimit);
            const overspeedIndices = new Set<number>();

            overspeedSections.forEach(section => {
                for (let i = section.startIndex; i <= section.endIndex; i++) {
                    overspeedIndices.add(i);
                }
            });

            // Draw main path segments
            let currentSegment: [number, number][] = [];
            for (let i = 0; i < sortedPoints.length; i++) {
                const point = sortedPoints[i];
                if (!overspeedIndices.has(i)) {
                    currentSegment.push([point.latitude, point.longitude]);
                } else {
                    if (currentSegment.length > 1) {
                        L.polyline(currentSegment, { color, weight: 4, opacity: 0.8 }).addTo(mapRef.current!);
                    }
                    currentSegment = [];
                }
            }
            if (currentSegment.length > 1) {
                L.polyline(currentSegment, { color, weight: 4, opacity: 0.8 }).addTo(mapRef.current!);
            }

            // Draw overspeed sections in red
            overspeedSections.forEach(section => {
                const coords: [number, number][] = section.points.map(p => [p.latitude, p.longitude]);
                L.polyline(coords, { color: '#EF4444', weight: 5, opacity: 0.9 })
                    .addTo(mapRef.current!)
                    .bindPopup(`
                        <div class="map-popup overspeed">
                          <h4>⚠️ Overspeed Section</h4>
                          <p><strong>Max Speed:</strong> ${formatSpeed(section.maxSpeed)}</p>
                          <p><strong>Points:</strong> ${section.points.length}</p>
                        </div>
                    `);
            });

            // Add start/end markers
            const startIcon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin start">S</div>', iconSize: [30, 42], iconAnchor: [15, 42] });
            const endIcon = L.divIcon({ className: 'custom-marker', html: '<div class="marker-pin end">E</div>', iconSize: [30, 42], iconAnchor: [15, 42] });

            L.marker([sortedPoints[0].latitude, sortedPoints[0].longitude], { icon: startIcon }).addTo(mapRef.current!).bindPopup('Trip Start');
            L.marker([sortedPoints[sortedPoints.length - 1].latitude, sortedPoints[sortedPoints.length - 1].longitude], { icon: endIcon }).addTo(mapRef.current!).bindPopup('Latest Position');

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

            // Auto-fit map
            const bounds = L.latLngBounds(sortedPoints.map(p => [p.latitude, p.longitude]));
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        } else {
            // Single point case
            const point = sortedPoints[0];
            mapRef.current.setView([point.latitude, point.longitude], 15);
        }

        // --- LIVE VEHICLE MARKER ---
        const lastPoint = sortedPoints[sortedPoints.length - 1];
        const vehicleIcon = L.divIcon({
            className: 'live-vehicle-icon',
            html: `
                <div style="background: #3B82F6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); position: relative;">
                    <div style="position: absolute; top: -10px; left: -10px; width: 36px; height: 36px; background: rgba(59, 130, 246, 0.3); border-radius: 50%; animation: pulse-anim 2s infinite;"></div>
                </div>
                <style>@keyframes pulse-anim { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }</style>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        L.marker([lastPoint.latitude, lastPoint.longitude], { icon: vehicleIcon, zIndexOffset: 1000 })
            .addTo(mapRef.current!)
            .bindTooltip("Current Position", { permanent: false, direction: 'top' });

    }, [gpsPoints, tripName, speedLimit, showStoppages, showIdling, color]);

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
