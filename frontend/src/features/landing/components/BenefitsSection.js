import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HistoryIcon from '@mui/icons-material/History';
import MyLocationIcon from '@mui/icons-material/MyLocation';
const BENEFITS = [
    {
        icon: _jsx(LocalGasStationIcon, { style: { fontSize: '1.3rem' } }),
        title: 'Spot fuel that went nowhere',
        text: 'Idle time shows the minutes an engine ran while the vehicle barely moved.',
    },
    {
        icon: _jsx(WarningAmberIcon, { style: { fontSize: '1.3rem' } }),
        title: 'Talk about speed with proof',
        text: 'Overspeed sits on the route, so a fast stretch is a place and a time, not a guess.',
    },
    {
        icon: _jsx(HistoryIcon, { style: { fontSize: '1.3rem' } }),
        title: 'Keep the trips you already drove',
        text: 'A CSV brings an old route back. You can reopen it whenever you need the details.',
    },
    {
        icon: _jsx(MyLocationIcon, { style: { fontSize: '1.3rem' } }),
        title: 'Check a vehicle while it is out',
        text: 'A phone can send its location live, so the map updates during the trip.',
    },
];
const BenefitsSection = () => {
    return (_jsx("section", { className: "lp-section", id: "benefits", children: _jsxs("div", { className: "lp-wrap", children: [_jsxs("div", { className: "lp-section-head", children: [_jsx("p", { className: "lp-kicker", children: "Why it helps" }), _jsx("h2", { className: "lp-display", children: "Less guessing about what happened on the road" }), _jsx("p", { className: "lp-lead", children: "The same trip record is useful whether you manage one vehicle or want a closer look at how someone drove." })] }), _jsx("ul", { className: "lp-benefits", children: BENEFITS.map((benefit) => (_jsxs("li", { children: [_jsx("span", { className: "lp-benefit-icon", "aria-hidden": "true", children: benefit.icon }), _jsxs("div", { children: [_jsx("h3", { children: benefit.title }), _jsx("p", { children: benefit.text })] })] }, benefit.title))) })] }) }));
};
export default BenefitsSection;
