import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const NAV_ITEMS = [
    { label: 'What it is', id: 'overview' },
    { label: 'What you see', id: 'features' },
    { label: 'How it works', id: 'how-it-works' },
];
const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };
    return (_jsxs("nav", { className: `lp-nav ${isOpen ? 'is-open' : ''}`, "aria-label": "Primary", children: [_jsxs("button", { className: "lp-logo", onClick: () => scrollToSection('hero'), type: "button", children: [_jsx("span", { className: "lp-logo-mark", "aria-hidden": "true", children: _jsx(SpeedIcon, { style: { fontSize: '1.25rem' } }) }), _jsx("span", { className: "lp-logo-word", children: "Speedo" })] }), _jsxs("div", { className: "lp-nav-links", children: [NAV_ITEMS.map((item) => (_jsx("button", { className: "lp-nav-link", onClick: () => scrollToSection(item.id), type: "button", children: item.label }, item.id))), _jsx("button", { className: "lp-nav-signin", onClick: () => navigate('/login'), type: "button", children: "Sign in" }), _jsx("button", { className: "lp-btn lp-btn-ink", onClick: () => navigate('/register'), type: "button", children: "Get started" })] }), _jsx("button", { className: "lp-btn lp-btn-ink lp-nav-mobile-cta", onClick: () => navigate('/register'), type: "button", children: "Start" }), _jsx("button", { className: "lp-nav-toggle", onClick: () => setIsOpen((open) => !open), type: "button", "aria-expanded": isOpen, "aria-label": isOpen ? 'Close menu' : 'Open menu', children: isOpen ? _jsx(CloseIcon, {}) : _jsx(MenuIcon, {}) })] }));
};
export default Navbar;
