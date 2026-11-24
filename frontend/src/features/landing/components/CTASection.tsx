import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTASection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="lp-cta" id="cta">
            <div className="lp-wrap">
                <div className="lp-cta-panel">
                    <p className="lp-kicker">Start with one trip</p>
                    <h2 className="lp-display">See a route the way Speedo reads it.</h2>
                    <p className="lp-lead">
                        Create an account, then track from a phone or upload a GPS file.
                        The map and the trip summary are ready as soon as the points are in.
                    </p>
                    <div className="lp-cta-actions">
                        <button className="lp-btn lp-btn-amber" onClick={() => navigate('/register')} type="button">
                            Create a free account
                            <ArrowForwardIcon style={{ fontSize: '1.1rem' }} />
                        </button>
                        <button className="lp-btn lp-btn-ghost" onClick={() => navigate('/login')} type="button">
                            I already have an account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
