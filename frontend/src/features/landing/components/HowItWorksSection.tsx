import React from 'react';
import { COLORS } from '../../../constants/constants';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import DashboardIcon from '@mui/icons-material/Dashboard';

const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            icon: <CloudUploadIcon style={{ fontSize: '3rem' }} />,
            title: 'Upload GPS Data',
            description: 'Simply upload your GPS tracking data in CSV format. Our system supports standard GPS data formats with latitude, longitude, and timestamp information.',
            number: '01',
        },
        {
            icon: <SettingsIcon style={{ fontSize: '3rem' }} />,
            title: 'Automatic Processing',
            description: 'Our backend processes your data using advanced algorithms and geolib calculations to extract meaningful insights about distance, speed, and behavior.',
            number: '02',
        },
        {
            icon: <InsightsIcon style={{ fontSize: '3rem' }} />,
            title: 'Get Insights',
            description: 'Receive detailed analytics on trip distance, average speed, idling time, stoppages, and overspeed incidents with precise calculations.',
            number: '03',
        },
        {
            icon: <DashboardIcon style={{ fontSize: '3rem' }} />,
            title: 'Visualize & Track',
            description: 'View your trips on interactive Leaflet maps with color-coded routes, markers for stops, and comprehensive trip summaries stored user-wise.',
            number: '04',
        },
    ];

    return (
        <section
            id="how-it-works"
            style={{
                padding: '6rem 2rem',
                background: `linear-gradient(180deg, ${COLORS.background} 0%, ${COLORS.card} 100%)`,
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2
                        className="section-title"
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: '800',
                            color: COLORS.textPrimary,
                            marginBottom: '1rem',
                        }}
                    >
                        How
                        <span
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginLeft: '0.5rem',
                            }}
                        >
                            Speedo Works
                        </span>
                    </h2>
                    <p
                        style={{
                            fontSize: '1.125rem',
                            color: COLORS.textSecondary,
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6',
                        }}
                    >
                        Four simple steps to transform your GPS data into actionable insights and beautiful visualizations.
                    </p>
                </div>

                {/* Steps */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '3rem',
                        position: 'relative',
                    }}
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="step-card"
                            style={{
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                            {/* Step Number */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '5rem',
                                    fontWeight: '900',
                                    color: COLORS.border,
                                    opacity: 0.3,
                                    zIndex: 0,
                                }}
                            >
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                    color: COLORS.textInverse,
                                    boxShadow: `0 10px 30px ${COLORS.shadow}`,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                                className="step-icon"
                            >
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: COLORS.textPrimary,
                                    marginBottom: '1rem',
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: '1rem',
                                    color: COLORS.textSecondary,
                                    lineHeight: '1.6',
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
