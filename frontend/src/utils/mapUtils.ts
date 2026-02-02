import { GPSPoint } from '../types/trip.types';

/**
 * Interface for overspeed section
 */
export interface OverspeedSection {
    points: GPSPoint[];
    startIndex: number;
    endIndex: number;
    maxSpeed: number;
}

/**
 * Interface for stoppage
 */
export interface Stoppage {
    location: { lat: number; lng: number };
    startTime: string;
    endTime: string;
    duration: number; // seconds
}

/**
 * Interface for idling point
 */
export interface IdlingPoint {
    location: { lat: number; lng: number };
    startTime: string;
    endTime: string;
    duration: number; // seconds
}

/**
 * Sort GPS points by timestamp in ascending order
 */
export const sortGPSPointsByTimestamp = (points: GPSPoint[]): GPSPoint[] => {
    if (!points || points.length === 0) {
        return [];
    }

    return [...points].sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return timeA - timeB;
    });
};

/**
 * Validate GPS points array
 */
export const validateGPSPoints = (points: GPSPoint[]): GPSPoint[] => {
    if (!points || points.length === 0) {
        return [];
    }

    return points.filter(point => {
        // Check for valid coordinates
        if (
            point.latitude == null ||
            point.longitude == null ||
            isNaN(point.latitude) ||
            isNaN(point.longitude)
        ) {
            return false;
        }

        // Check coordinate ranges
        if (
            point.latitude < -90 ||
            point.latitude > 90 ||
            point.longitude < -180 ||
            point.longitude > 180
        ) {
            return false;
        }

        // Check for valid timestamp
        if (!point.timestamp || isNaN(new Date(point.timestamp).getTime())) {
            return false;
        }

        return true;
    });
};

/**
 * Detect continuous overspeed sections
 */
export const detectOverspeedSections = (
    points: GPSPoint[],
    speedLimit: number = 80
): OverspeedSection[] => {
    if (!points || points.length === 0) {
        return [];
    }

    const sections: OverspeedSection[] = [];
    let currentSection: GPSPoint[] = [];
    let startIndex = -1;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point.speed > speedLimit) {
            if (currentSection.length === 0) {
                startIndex = i;
            }
            currentSection.push(point);
        } else {
            if (currentSection.length > 0) {
                const maxSpeed = Math.max(...currentSection.map(p => p.speed));
                sections.push({
                    points: [...currentSection],
                    startIndex,
                    endIndex: i - 1,
                    maxSpeed,
                });
                currentSection = [];
                startIndex = -1;
            }
        }
    }

    // Don't forget the last section if it ends with overspeed
    if (currentSection.length > 0) {
        const maxSpeed = Math.max(...currentSection.map(p => p.speed));
        sections.push({
            points: [...currentSection],
            startIndex,
            endIndex: points.length - 1,
            maxSpeed,
        });
    }

    return sections;
};

/**
 * Detect stoppages (ignition OFF periods)
 */
export const detectStoppages = (points: GPSPoint[]): Stoppage[] => {
    if (!points || points.length === 0) {
        return [];
    }

    const stoppages: Stoppage[] = [];
    let stoppageStart: GPSPoint | null = null;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (!point.ignition && !stoppageStart) {
            // Stoppage started
            stoppageStart = point;
        } else if (point.ignition && stoppageStart) {
            // Stoppage ended
            const startTime = new Date(stoppageStart.timestamp).getTime();
            const endTime = new Date(point.timestamp).getTime();
            const duration = (endTime - startTime) / 1000;

            // Only record stoppages longer than 30 seconds
            if (duration > 30) {
                stoppages.push({
                    location: {
                        lat: stoppageStart.latitude,
                        lng: stoppageStart.longitude,
                    },
                    startTime: stoppageStart.timestamp,
                    endTime: point.timestamp,
                    duration,
                });
            }

            stoppageStart = null;
        }
    }

    // Handle case where trip ends with ignition OFF
    if (stoppageStart && points.length > 0) {
        const lastPoint = points[points.length - 1];
        const startTime = new Date(stoppageStart.timestamp).getTime();
        const endTime = new Date(lastPoint.timestamp).getTime();
        const duration = (endTime - startTime) / 1000;

        if (duration > 30) {
            stoppages.push({
                location: {
                    lat: stoppageStart.latitude,
                    lng: stoppageStart.longitude,
                },
                startTime: stoppageStart.timestamp,
                endTime: lastPoint.timestamp,
                duration,
            });
        }
    }

    return stoppages;
};

/**
 * Detect idling points (ignition ON but speed = 0)
 */
export const detectIdlingPoints = (points: GPSPoint[]): IdlingPoint[] => {
    if (!points || points.length === 0) {
        return [];
    }

    const idlingPoints: IdlingPoint[] = [];
    let idlingStart: GPSPoint | null = null;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];

        if (point.ignition && point.speed === 0 && !idlingStart) {
            // Idling started
            idlingStart = point;
        } else if (
            idlingStart &&
            (point.speed > 0 || !point.ignition)
        ) {
            // Idling ended
            const startTime = new Date(idlingStart.timestamp).getTime();
            const endTime = new Date(point.timestamp).getTime();
            const duration = (endTime - startTime) / 1000;

            // Only record idling longer than 60 seconds (1 minute)
            if (duration > 60) {
                idlingPoints.push({
                    location: {
                        lat: idlingStart.latitude,
                        lng: idlingStart.longitude,
                    },
                    startTime: idlingStart.timestamp,
                    endTime: point.timestamp,
                    duration,
                });
            }

            idlingStart = null;
        }
    }

    // Handle case where trip ends with idling
    if (idlingStart && points.length > 0) {
        const lastPoint = points[points.length - 1];
        const startTime = new Date(idlingStart.timestamp).getTime();
        const endTime = new Date(lastPoint.timestamp).getTime();
        const duration = (endTime - startTime) / 1000;

        if (duration > 60) {
            idlingPoints.push({
                location: {
                    lat: idlingStart.latitude,
                    lng: idlingStart.longitude,
                },
                startTime: idlingStart.timestamp,
                endTime: lastPoint.timestamp,
                duration,
            });
        }
    }

    return idlingPoints;
};

/**
 * Calculate map bounds from GPS points
 */
export const calculateBounds = (
    points: GPSPoint[]
): [[number, number], [number, number]] | null => {
    if (!points || points.length === 0) {
        return null;
    }

    let minLat = points[0].latitude;
    let maxLat = points[0].latitude;
    let minLng = points[0].longitude;
    let maxLng = points[0].longitude;

    for (const point of points) {
        if (point.latitude < minLat) minLat = point.latitude;
        if (point.latitude > maxLat) maxLat = point.latitude;
        if (point.longitude < minLng) minLng = point.longitude;
        if (point.longitude > maxLng) maxLng = point.longitude;
    }

    // Add small padding (0.001 degrees ≈ 100 meters)
    const padding = 0.001;

    return [
        [minLat - padding, minLng - padding],
        [maxLat + padding, maxLng + padding],
    ];
};
