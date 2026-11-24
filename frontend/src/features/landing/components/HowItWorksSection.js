import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STEPS = [
    {
        number: '01',
        title: 'Add the GPS',
        text: 'Share location from a phone, or upload a CSV of latitude, longitude, and time.',
    },
    {
        number: '02',
        title: 'Speedo reads the points',
        text: 'The points are lined up into one trip. Distance, speed, idle, stops, and overspeed are worked out for you.',
    },
    {
        number: '03',
        title: 'Read the summary',
        text: 'Open the trip and see the numbers in plain language, without building a spreadsheet.',
    },
    {
        number: '04',
        title: 'Follow it on the map',
        text: 'Trace the route, the places it stopped, and the moments it went too fast.',
    },
];
const HowItWorksSection = () => {
    return (_jsx("section", { className: "lp-section", id: "how-it-works", children: _jsxs("div", { className: "lp-wrap", children: [_jsxs("div", { className: "lp-section-head", children: [_jsx("p", { className: "lp-kicker", children: "How it works" }), _jsx("h2", { className: "lp-display", children: "Four steps, from a location to a trip you can read" }), _jsx("p", { className: "lp-lead", children: "You do not need to know how GPS math works. Add the points, then look at the result." })] }), _jsx("div", { className: "lp-steps", children: STEPS.map((step) => (_jsxs("article", { className: "lp-step", children: [_jsx("div", { className: "lp-step-num", children: step.number }), _jsx("h3", { children: step.title }), _jsx("p", { children: step.text })] }, step.number))) })] }) }));
};
export default HowItWorksSection;
