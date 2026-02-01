import React from 'react';
import { COLORS } from '../../../constants/constants';
import SpeedIcon from '@mui/icons-material/Speed';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                color: COLORS.textInverse,
                padding: '4rem 2rem 2rem',
                marginTop: '4rem',
            }}
        >
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                {/* Main Footer Content */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '3rem',
                        marginBottom: '3rem',
                    }}
                >
                    {/* Company Info */}
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <div
                                style={{
                                    background: COLORS.textInverse,
                                    borderRadius: '10px',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <SpeedIcon style={{ color: COLORS.primary, fontSize: '1.5rem' }} />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>Speedo</span>
                        </div>
                        <p style={{ opacity: 0.9, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Advanced vehicle trip tracking and analysis system. Monitor your fleet with precision and gain valuable insights.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: COLORS.textInverse,
                                    transition: 'transform 0.3s ease',
                                }}
                                className="social-link"
                            >
                                <GitHubIcon />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: COLORS.textInverse,
                                    transition: 'transform 0.3s ease',
                                }}
                                className="social-link"
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: COLORS.textInverse,
                                    transition: 'transform 0.3s ease',
                                }}
                                className="social-link"
                            >
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Quick Links
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['Features', 'How It Works', 'Benefits', 'Pricing', 'Documentation'].map((link) => (
                                <li key={link} style={{ marginBottom: '0.75rem' }}>
                                    <a
                                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                        style={{
                                            color: COLORS.textInverse,
                                            textDecoration: 'none',
                                            opacity: 0.9,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                        className="footer-link"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Resources
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {['API Documentation', 'Support Center', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((link) => (
                                <li key={link} style={{ marginBottom: '0.75rem' }}>
                                    <a
                                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                                        style={{
                                            color: COLORS.textInverse,
                                            textDecoration: 'none',
                                            opacity: 0.9,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                        className="footer-link"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                            Contact Us
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <EmailIcon style={{ opacity: 0.9 }} />
                                <span style={{ opacity: 0.9 }}>support@speedo.com</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <PhoneIcon style={{ opacity: 0.9 }} />
                                <span style={{ opacity: 0.9 }}>+1 (555) 123-4567</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <LocationOnIcon style={{ opacity: 0.9 }} />
                                <span style={{ opacity: 0.9 }}>123 Tech Street, Silicon Valley, CA</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
                        paddingTop: '2rem',
                        textAlign: 'center',
                        opacity: 0.9,
                    }}
                >
                    <p style={{ margin: 0 }}>
                        © {currentYear} Speedo. All rights reserved. Built with ❤️ for better fleet management.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
