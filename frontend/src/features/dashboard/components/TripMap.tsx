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
    calculateBounds,
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

            // Add OpenStreetMap tile layer
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
        if (validPoints.length === 0) {
            return;
        }

        const sortedPoints = sortGPSPointsByTimestamp(validPoints);

        // Handle single point case
        if (sortedPoints.length === 1) {
            const point = sortedPoints[0];
            const marker = L.marker([point.latitude, point.longitude]).addTo(mapRef.current);
            marker.bindPopup(`
        <div class="map-popup">
          <h4>${tripName}</h4>
          <p><strong>Single GPS Point</strong></p>
          <p>Time: ${new Date(point.timestamp).toLocaleString()}</p>
          <p>Speed: ${formatSpeed(point.speed)}</p>
          <p>Ignition: ${point.ignition ? 'ON' : 'OFF'}</p>
        </div>
      `);
            mapRef.current.setView([point.latitude, point.longitude], 15);
            return;
        }

        // Draw main path (normal speed sections)
        const overspeedSections = detectOverspeedSections(sortedPoints, speedLimit);
        const overspeedIndices = new Set<number>();

        // Mark all overspeed point indices
        overspeedSections.forEach(section => {
            for (let i = section.startIndex; i <= section.endIndex; i++) {
                overspeedIndices.add(i);
            }
        });

        // Build main path (excluding overspeed points)
        let currentSegment: [number, number][] = [];
        for (let i = 0; i < sortedPoints.length; i++) {
            const point = sortedPoints[i];

            if (!overspeedIndices.has(i)) {
                currentSegment.push([point.latitude, point.longitude]);
            } else {
                // Draw accumulated segment
                if (currentSegment.length > 1) {
                    L.polyline(currentSegment, {
                        color: color,
                        weight: 4,
                        opacity: 0.8,
                    }).addTo(mapRef.current!);
                }
                currentSegment = [];
            }
        }

        // Draw final segment
        if (currentSegment.length > 1) {
            L.polyline(currentSegment, {
                color: color,
                weight: 4,
                opacity: 0.8,
            }).addTo(mapRef.current!);
        }

        // Draw overspeed sections in red
        overspeedSections.forEach(section => {
            const overspeedCoords: [number, number][] = section.points.map(p => [
                p.latitude,
                p.longitude,
            ]);

            const overspeedLine = L.polyline(overspeedCoords, {
                color: '#EF4444',
                weight: 5,
                opacity: 0.9,
            }).addTo(mapRef.current!);

            overspeedLine.bindPopup(`
        <div class="map-popup overspeed">
          <h4>⚠️ Overspeed Section</h4>
          <p><strong>Max Speed:</strong> ${formatSpeed(section.maxSpeed)}</p>
          <p><strong>Speed Limit:</strong> ${formatSpeed(speedLimit)}</p>
          <p><strong>Points:</strong> ${section.points.length}</p>
        </div>
      `);
        });

        // Add start marker (green)
        const startPoint = sortedPoints[0];
        const startIcon = L.divIcon({
            className: 'custom-marker start-marker',
            html: '<div class="marker-pin start">S</div>',
            iconSize: [30, 42],
            iconAnchor: [15, 42],
        });

        L.marker([startPoint.latitude, startPoint.longitude], { icon: startIcon })
            .addTo(mapRef.current!)
            .bindPopup(`
        <div class="map-popup">
          <h4>🟢 Trip Start</h4>
          <p><strong>Time:</strong> ${new Date(startPoint.timestamp).toLocaleString()}</p>
          <p><strong>Location:</strong> ${startPoint.latitude.toFixed(6)}, ${startPoint.longitude.toFixed(6)}</p>
        </div>
      `);

        // Add end marker (red)
        const endPoint = sortedPoints[sortedPoints.length - 1];
        const endIcon = L.divIcon({
            className: 'custom-marker end-marker',
            html: '<div class="marker-pin end">E</div>',
            iconSize: [30, 42],
            iconAnchor: [15, 42],
        });

        L.marker([endPoint.latitude, endPoint.longitude], { icon: endIcon })
            .addTo(mapRef.current!)
            .bindPopup(`
        <div class="map-popup">
          <h4>🔴 Trip End</h4>
          <p><strong>Time:</strong> ${new Date(endPoint.timestamp).toLocaleString()}</p>
          <p><strong>Location:</strong> ${endPoint.latitude.toFixed(6)}, ${endPoint.longitude.toFixed(6)}</p>
        </div>
      `);

        // Add stoppage markers
        if (showStoppages) {
            const stoppages = detectStoppages(sortedPoints);
            stoppages.forEach((stoppage, index) => {
                const stoppageIcon = L.divIcon({
                    className: 'custom-marker stoppage-marker',
                    html: '<div class="marker-pin stoppage">P</div>',
                    iconSize: [30, 42],
                    iconAnchor: [15, 42],
                });

                L.marker([stoppage.location.lat, stoppage.location.lng], { icon: stoppageIcon })
                    .addTo(mapRef.current!)
                    .bindPopup(`
            <div class="map-popup stoppage">
              <h4>🅿️ Stoppage #${index + 1}</h4>
              <p><strong>Start:</strong> ${new Date(stoppage.startTime).toLocaleTimeString()}</p>
              <p><strong>End:</strong> ${new Date(stoppage.endTime).toLocaleTimeString()}</p>
              <p><strong>Duration:</strong> ${formatDuration(stoppage.duration)}</p>
            </div>
          `);
            });
        }

        // Add idling markers
        if (showIdling) {
            const idlingPoints = detectIdlingPoints(sortedPoints);
            idlingPoints.forEach((idling, index) => {
                const idlingIcon = L.divIcon({
                    className: 'custom-marker idling-marker',
                    html: '<div class="marker-pin idling">I</div>',
                    iconSize: [30, 42],
                    iconAnchor: [15, 42],
                });

                L.marker([idling.location.lat, idling.location.lng], { icon: idlingIcon })
                    .addTo(mapRef.current!)
                    .bindPopup(`
            <div class="map-popup idling">
              <h4>⏸️ Idling #${index + 1}</h4>
              <p><strong>Start:</strong> ${new Date(idling.startTime).toLocaleTimeString()}</p>
              <p><strong>End:</strong> ${new Date(idling.endTime).toLocaleTimeString()}</p>
              <p><strong>Duration:</strong> ${formatDuration(idling.duration)}</p>
            </div>
          `);
            });
        }

        // Auto-fit bounds to show entire trip
        const bounds = calculateBounds(sortedPoints);
        if (bounds && mapRef.current) {
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }

        // Cleanup function
        return () => {
            // Don't destroy map, just clear layers
        };
    }, [gpsPoints, tripName, speedLimit, showStoppages, showIdling, color]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <div className="trip-map-container">
            <div ref={mapContainerRef} className="trip-map" />
        </div>
    );
};

export default TripMap;
