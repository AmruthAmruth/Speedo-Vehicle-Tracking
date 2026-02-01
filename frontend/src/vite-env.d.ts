/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_MAP_TILE_URL: string;
    readonly VITE_DEFAULT_MAP_CENTER_LAT: string;
    readonly VITE_DEFAULT_MAP_CENTER_LNG: string;
    readonly VITE_DEFAULT_MAP_ZOOM: string;
    readonly VITE_OVERSPEED_THRESHOLD: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
