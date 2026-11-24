import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
const Footer = () => {
    const navigate = useNavigate();
    const year = new Date().getFullYear();
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    return (_jsx("footer", { className: "lp-footer", children: _jsxs("div", { className: "lp-wrap", children: [_jsxs("div", { className: "lp-footer-grid", children: [_jsxs("div", { children: [_jsxs("div", { className: "lp-footer-brand", children: [_jsx("span", { className: "lp-logo-mark", "aria-hidden": "true", children: _jsx(SpeedIcon, { style: { fontSize: '1.15rem' } }) }), "Speedo"] }), _jsx("p", { children: "A vehicle tracking app that turns GPS into a trip you can read: the route, the speed, the stops, and the moments that went too fast." })] }), _jsxs("div", { children: [_jsx("h3", { children: "On this page" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("button", { type: "button", onClick: () => scrollTo('overview'), children: "What Speedo is" }) }), _jsx("li", { children: _jsx("button", { type: "button", onClick: () => scrollTo('features'), children: "What you see" }) }), _jsx("li", { children: _jsx("button", { type: "button", onClick: () => scrollTo('how-it-works'), children: "How it works" }) }), _jsx("li", { children: _jsx("button", { type: "button", onClick: () => scrollTo('benefits'), children: "Why it helps" }) })] })] }), _jsxs("div", { children: [_jsx("h3", { children: "Account" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("button", { type: "button", onClick: () => navigate('/register'), children: "Create an account" }) }), _jsx("li", { children: _jsx("button", { type: "button", onClick: () => navigate('/login'), children: "Sign in" }) })] })] })] }), _jsxs("div", { className: "lp-footer-base", children: [_jsxs("span", { children: ["\u00A9 ", year, " Speedo"] }), _jsx("span", { children: "Track a trip. Understand the drive." })] })] }) }));
};
export default Footer;
