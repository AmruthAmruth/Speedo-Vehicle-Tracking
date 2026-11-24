import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NAV_ITEMS = [
    { label: 'What it is', id: 'overview' },
    { label: 'What you see', id: 'features' },
    { label: 'How it works', id: 'how-it-works' },
];

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <nav className={`lp-nav ${isOpen ? 'is-open' : ''}`} aria-label="Primary">
            <button className="lp-logo" onClick={() => scrollToSection('hero')} type="button">
                <span className="lp-logo-mark" aria-hidden="true">
                    <SpeedIcon style={{ fontSize: '1.25rem' }} />
                </span>
                <span className="lp-logo-word">Speedo</span>
            </button>

            <div className="lp-nav-links">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        className="lp-nav-link"
                        onClick={() => scrollToSection(item.id)}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
                <button className="lp-nav-signin" onClick={() => navigate('/login')} type="button">
                    Sign in
                </button>
                <button className="lp-btn lp-btn-ink" onClick={() => navigate('/register')} type="button">
                    Get started
                </button>
            </div>

            <button className="lp-btn lp-btn-ink lp-nav-mobile-cta" onClick={() => navigate('/register')} type="button">
                Start
            </button>
            <button
                className="lp-nav-toggle"
                onClick={() => setIsOpen((open) => !open)}
                type="button"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </nav>
    );
};

export default Navbar;
