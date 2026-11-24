import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const CTASection = () => {
    const navigate = useNavigate();
    return (_jsx("section", { className: "lp-cta", id: "cta", children: _jsx("div", { className: "lp-wrap", children: _jsxs("div", { className: "lp-cta-panel", children: [_jsx("p", { className: "lp-kicker", children: "Start with one trip" }), _jsx("h2", { className: "lp-display", children: "See a route the way Speedo reads it." }), _jsx("p", { className: "lp-lead", children: "Create an account, then track from a phone or upload a GPS file. The map and the trip summary are ready as soon as the points are in." }), _jsxs("div", { className: "lp-cta-actions", children: [_jsxs("button", { className: "lp-btn lp-btn-amber", onClick: () => navigate('/register'), type: "button", children: ["Create a free account", _jsx(ArrowForwardIcon, { style: { fontSize: '1.1rem' } })] }), _jsx("button", { className: "lp-btn lp-btn-ghost", onClick: () => navigate('/login'), type: "button", children: "I already have an account" })] })] }) }) }));
};
export default CTASection;
