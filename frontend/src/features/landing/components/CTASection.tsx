import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../../constants/constants';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section
            id="cta"
            style={{
                padding: '6rem 2rem',
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 50%, ${COLORS.secondary} 100%)`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Pattern */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: `radial-gradient(circle, ${COLORS.textInverse} 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                }}
            />

            <div
                style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Icon */}
                <div
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        border: `2px solid rgba(255, 255, 255, 0.3)`,
                    }}
                    className="cta-icon"
                >
                    <RocketLaunchIcon
                        style={{
                            fontSize: '3.5rem',
                            color: COLORS.textInverse,
                        }}
                    />
                </div>

                {/* Heading */}
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        color: COLORS.textInverse,
                        marginBottom: '1.5rem',
                        lineHeight: '1.2',
                    }}
                >
                    Ready to Transform Your Fleet Management?
                </h2>

                {/* Description */}
                <p
                    style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.375rem)',
                        color: COLORS.textInverse,
                        opacity: 0.95,
                        marginBottom: '3rem',
                        lineHeight: '1.6',
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                    }}
                >
                    Join hundreds of businesses already using Speedo to track their vehicles, optimize routes, and reduce costs. Start your journey today!
                </p>

                {/* CTA Buttons */}
                <div
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="cta-btn-primary"
                        style={{
                            background: COLORS.textInverse,
                            color: COLORS.primary,
                            border: 'none',
                            padding: '1.25rem 3rem',
                            borderRadius: '12px',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                        }}
                    >
                        Get Started Now
                        <ArrowForwardIcon />
                    </button>
                    <button
                        className="cta-btn-secondary"
                        style={{
                            background: 'transparent',
                            color: COLORS.textInverse,
                            border: `2px solid ${COLORS.textInverse}`,
                            padding: '1.25rem 3rem',
                            borderRadius: '12px',
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Schedule Demo
                    </button>
                </div>

                {/* Trust Indicators */}
                <div
                    style={{
                        marginTop: '4rem',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        flexWrap: 'wrap',
                        color: COLORS.textInverse,
                    }}
                >
                    {[
                        { label: 'Free Trial', value: '30 Days' },
                        { label: 'No Credit Card', value: 'Required' },
                        { label: 'Setup Time', value: '5 Minutes' },
                    ].map((item, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                {item.value}
                            </div>
                            <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CTASection;
