import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const year = new Date().getFullYear();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="lp-footer">
            <div className="lp-wrap">
                <div className="lp-footer-grid">
                    <div>
                        <div className="lp-footer-brand">
                            <span className="lp-logo-mark" aria-hidden="true">
                                <SpeedIcon style={{ fontSize: '1.15rem' }} />
                            </span>
                            Speedo
                        </div>
                        <p>
                            A vehicle tracking app that turns GPS into a trip you can read:
                            the route, the speed, the stops, and the moments that went too fast.
                        </p>
                    </div>
                    <div>
                        <h3>On this page</h3>
                        <ul>
                            <li><button type="button" onClick={() => scrollTo('overview')}>What Speedo is</button></li>
                            <li><button type="button" onClick={() => scrollTo('features')}>What you see</button></li>
                            <li><button type="button" onClick={() => scrollTo('how-it-works')}>How it works</button></li>
                            <li><button type="button" onClick={() => scrollTo('benefits')}>Why it helps</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Account</h3>
                        <ul>
                            <li><button type="button" onClick={() => navigate('/register')}>Create an account</button></li>
                            <li><button type="button" onClick={() => navigate('/login')}>Sign in</button></li>
                        </ul>
                    </div>
                </div>
                <div className="lp-footer-base">
                    <span>© {year} Speedo</span>
                    <span>Track a trip. Understand the drive.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
