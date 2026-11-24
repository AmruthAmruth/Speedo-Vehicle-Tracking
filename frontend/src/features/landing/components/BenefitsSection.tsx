import React from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HistoryIcon from '@mui/icons-material/History';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const BENEFITS = [
    {
        icon: <LocalGasStationIcon style={{ fontSize: '1.3rem' }} />,
        title: 'Spot fuel that went nowhere',
        text: 'Idle time shows the minutes an engine ran while the vehicle barely moved.',
    },
    {
        icon: <WarningAmberIcon style={{ fontSize: '1.3rem' }} />,
        title: 'Talk about speed with proof',
        text: 'Overspeed sits on the route, so a fast stretch is a place and a time, not a guess.',
    },
    {
        icon: <HistoryIcon style={{ fontSize: '1.3rem' }} />,
        title: 'Keep the trips you already drove',
        text: 'A CSV brings an old route back. You can reopen it whenever you need the details.',
    },
    {
        icon: <MyLocationIcon style={{ fontSize: '1.3rem' }} />,
        title: 'Check a vehicle while it is out',
        text: 'A phone can send its location live, so the map updates during the trip.',
    },
];

const BenefitsSection: React.FC = () => {
    return (
        <section className="lp-section" id="benefits">
            <div className="lp-wrap">
                <div className="lp-section-head">
                    <p className="lp-kicker">Why it helps</p>
                    <h2 className="lp-display">Less guessing about what happened on the road</h2>
                    <p className="lp-lead">
                        The same trip record is useful whether you manage one vehicle or want a closer look at how someone drove.
                    </p>
                </div>
                <ul className="lp-benefits">
                    {BENEFITS.map((benefit) => (
                        <li key={benefit.title}>
                            <span className="lp-benefit-icon" aria-hidden="true">{benefit.icon}</span>
                            <div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default BenefitsSection;
