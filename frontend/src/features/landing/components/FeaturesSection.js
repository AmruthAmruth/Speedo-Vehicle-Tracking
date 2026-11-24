import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MapIcon from '@mui/icons-material/Map';
const FEATURES = [
    {
        icon: _jsx(RouteIcon, {}),
        tone: 'tone-green',
        title: 'Distance',
        text: 'The length of the path, measured from the GPS points in order.',
    },
    {
        icon: _jsx(SpeedIcon, {}),
        tone: 'tone-blue',
        title: 'Speed',
        text: 'Average speed and the fastest moment, so a trip is more than a start and end time.',
    },
    {
        icon: _jsx(LocalParkingIcon, {}),
        tone: 'tone-amber',
        title: 'Idling',
        text: 'Time the vehicle stayed almost still. Useful when fuel is being used without moving.',
    },
    {
        icon: _jsx(StopCircleIcon, {}),
        tone: 'tone-orange',
        title: 'Stops',
        text: 'Where the vehicle stopped, and how long it stayed there.',
    },
    {
        icon: _jsx(WarningAmberIcon, {}),
        tone: 'tone-red',
        title: 'Overspeed',
        text: 'The stretches that went too fast, marked so they are easy to find later.',
    },
    {
        icon: _jsx(MapIcon, {}),
        tone: 'tone-ink',
        title: 'The map',
        text: 'The whole route in one view, with the start, the stops, and the driving in between.',
    },
];
const FeaturesSection = () => {
    return (_jsx("section", { className: "lp-section", id: "features", children: _jsxs("div", { className: "lp-wrap", children: [_jsxs("div", { className: "lp-section-head", children: [_jsx("p", { className: "lp-kicker", children: "What you see" }), _jsx("h2", { className: "lp-display", children: "Six things every trip can tell you" }), _jsx("p", { className: "lp-lead", children: "After a trip is in, Speedo fills in the same set of answers. You do not have to calculate them yourself." })] }), _jsx("div", { className: "lp-features", children: FEATURES.map((feature) => (_jsxs("article", { className: "lp-feature", children: [_jsx("div", { className: `lp-feature-icon ${feature.tone}`, "aria-hidden": "true", children: feature.icon }), _jsx("h3", { children: feature.title }), _jsx("p", { children: feature.text })] }, feature.title))) })] }) }));
};
export default FeaturesSection;
