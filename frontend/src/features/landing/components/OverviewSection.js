import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MapIcon from '@mui/icons-material/Map';
const POINTS = [
    {
        icon: _jsx(SmartphoneIcon, { style: { fontSize: '1.25rem' } }),
        title: 'A phone can be the tracker',
        text: 'Open Speedo on a phone and it shares location while the trip is happening. You can watch that trip on the dashboard.',
    },
    {
        icon: _jsx(CloudUploadIcon, { style: { fontSize: '1.25rem' } }),
        title: 'A file works for old trips',
        text: 'If the drive is already over, upload a CSV with latitude, longitude, and time. Speedo rebuilds the trip from those points.',
    },
    {
        icon: _jsx(MapIcon, { style: { fontSize: '1.25rem' } }),
        title: 'The result is a story, not a spreadsheet',
        text: 'You see how far it went, how fast it moved, where it waited, and where it went over the limit — on one map.',
    },
];
const OverviewSection = () => {
    return (_jsx("section", { className: "lp-section", id: "overview", children: _jsx("div", { className: "lp-wrap", children: _jsxs("div", { className: "lp-overview", children: [_jsxs("div", { children: [_jsx("p", { className: "lp-kicker", children: "What Speedo is" }), _jsx("h2", { className: "lp-display", children: "A clear record of where a vehicle went, and how it was driven." }), _jsx("p", { className: "lp-lead", children: "Speedo is a website for trip tracking. It does not need a special device in the vehicle. Bring a phone, or bring a GPS file." })] }), _jsx("ol", { className: "lp-overview-list", children: POINTS.map((point) => (_jsxs("li", { children: [_jsx("span", { className: "lp-overview-icon", "aria-hidden": "true", children: point.icon }), _jsxs("div", { children: [_jsx("h3", { children: point.title }), _jsx("p", { children: point.text })] })] }, point.title))) })] }) }) }));
};
export default OverviewSection;
