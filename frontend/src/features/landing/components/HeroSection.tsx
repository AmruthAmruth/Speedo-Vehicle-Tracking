import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    const scrollToHow = () => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="lp-hero" id="hero">
            <div className="lp-hero-gridlines" aria-hidden="true" />
            <div className="lp-wrap lp-hero-grid">
                <div>
                    <p className="lp-kicker">Vehicle tracking</p>
                    <h1 className="lp-display">
                        Follow the route.
                        <em>Read the drive.</em>
                    </h1>
                    <p className="lp-hero-lead">
                        Speedo is a simple way to see what a vehicle did. Track it live from a phone,
                        or upload a GPS file from a trip that already happened. You get the distance,
                        the speed, the stops, and a map that is easy to follow.
                    </p>
                    <div className="lp-hero-actions">
                        <button className="lp-btn lp-btn-amber" onClick={() => navigate('/register')} type="button">
                            Create a free account
                            <ArrowForwardIcon style={{ fontSize: '1.1rem' }} />
                        </button>
                        <button className="lp-btn lp-btn-ghost" onClick={scrollToHow} type="button">
                            See how it works
                        </button>
                    </div>
                    <ul className="lp-pills">
                        <li>No extra hardware</li>
                        <li>Phone or CSV file</li>
                        <li>Map, speed, and stops</li>
                    </ul>
                </div>

                <article className="lp-preview" aria-label="Example of a trip in Speedo">
                    <div className="lp-preview-head">
                        <div>
                            <p className="lp-preview-label">Example trip</p>
                            <h2>Morning city route</h2>
                        </div>
                        <span className="lp-live"><i /> Live</span>
                    </div>
                    <div className="lp-preview-map">
                        <svg className="lp-route-svg" viewBox="0 0 400 220" role="img" aria-label="A sample route from start to the current position">
                            <path
                                d="M36 170 C 78 166, 92 124, 132 114 S 176 74, 206 94 S 250 158, 292 132 S 338 64, 368 52"
                                fill="none"
                                stroke="rgba(247,243,234,0.18)"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />
                            <path
                                d="M36 170 C 78 166, 92 124, 132 114 S 176 74, 206 94"
                                fill="none"
                                stroke="#3dbe8b"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M206 94 C 228 112, 246 150, 292 132"
                                fill="none"
                                stroke="#f0b429"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M292 132 C 318 122, 340 78, 368 52"
                                fill="none"
                                stroke="#ef6b5a"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                            />
                            <circle cx="36" cy="170" r="5.5" fill="#3dbe8b" />
                            <circle cx="368" cy="52" r="6" fill="#f7f3ea" />
                        </svg>
                        <span className="lp-map-tag lp-map-tag-start">Start · 8:12</span>
                        <span className="lp-map-tag lp-map-tag-now">Now · 42 km/h</span>
                    </div>
                    <dl className="lp-preview-stats">
                        <div>
                            <dt>Distance</dt>
                            <dd>18.4 km</dd>
                        </div>
                        <div>
                            <dt>Avg speed</dt>
                            <dd>46 km/h</dd>
                        </div>
                        <div>
                            <dt>Idle</dt>
                            <dd>4 min</dd>
                        </div>
                        <div>
                            <dt>Too fast</dt>
                            <dd>1</dd>
                        </div>
                    </dl>
                    <p className="lp-legend">
                        <span><i className="lp-dot lp-dot-green" /> Moving</span>
                        <span><i className="lp-dot lp-dot-amber" /> Idle or stop</span>
                        <span><i className="lp-dot lp-dot-red" /> Overspeed</span>
                    </p>
                </article>
            </div>
        </section>
    );
};

export default HeroSection;
