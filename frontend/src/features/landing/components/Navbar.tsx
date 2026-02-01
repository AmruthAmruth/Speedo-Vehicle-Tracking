import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../constants/constants';
import SpeedIcon from '@mui/icons-material/Speed';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.3s ease',
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                boxShadow: isScrolled ? `0 4px 20px ${COLORS.shadow}` : 'none',
                padding: '1rem 2rem',
            }}
        >
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Logo */}
                <div
                    className="logo-container"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                    }}
                    onClick={() => scrollToSection('hero')}
                >
                    <div
                        className="logo-icon"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                            borderRadius: '12px',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 4px 15px ${COLORS.shadow}`,
                        }}
                    >
                        <SpeedIcon style={{ color: COLORS.textInverse, fontSize: '1.75rem' }} />
                    </div>
                    <span
                        className="logo-text"
                        style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Speedo
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div
                    className="nav-links-desktop"
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    {['Features', 'How It Works', 'Benefits'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: COLORS.textPrimary,
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                            }}
                            className="nav-link"
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('cta')}
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                            color: COLORS.textInverse,
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: `0 4px 15px ${COLORS.shadow}`,
                            transition: 'all 0.3s ease',
                        }}
                        className="login-btn"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                    }}
                >
                    {isMobileMenuOpen ? (
                        <CloseIcon style={{ color: COLORS.textPrimary, fontSize: '1.75rem' }} />
                    ) : (
                        <MenuIcon style={{ color: COLORS.textPrimary, fontSize: '1.75rem' }} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
                style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: COLORS.card,
                    borderRadius: '12px',
                    boxShadow: `0 4px 20px ${COLORS.shadow}`,
                }}
            >
                {['Features', 'How It Works', 'Benefits'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: COLORS.textPrimary,
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            padding: '0.75rem',
                            textAlign: 'left',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                        }}
                        className="nav-link-mobile"
                    >
                        {item}
                    </button>
                ))}
                <button
                    onClick={() => scrollToSection('cta')}
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                        color: COLORS.textInverse,
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: `0 4px 15px ${COLORS.shadow}`,
                    }}
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
