import React from 'react';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MapIcon from '@mui/icons-material/Map';

const POINTS = [
    {
        icon: <SmartphoneIcon style={{ fontSize: '1.25rem' }} />,
        title: 'A phone can be the tracker',
        text: 'Open Speedo on a phone and it shares location while the trip is happening. You can watch that trip on the dashboard.',
    },
    {
        icon: <CloudUploadIcon style={{ fontSize: '1.25rem' }} />,
        title: 'A file works for old trips',
        text: 'If the drive is already over, upload a CSV with latitude, longitude, and time. Speedo rebuilds the trip from those points.',
    },
    {
        icon: <MapIcon style={{ fontSize: '1.25rem' }} />,
        title: 'The result is a story, not a spreadsheet',
        text: 'You see how far it went, how fast it moved, where it waited, and where it went over the limit — on one map.',
    },
];

const OverviewSection: React.FC = () => {
    return (
        <section className="lp-section" id="overview">
            <div className="lp-wrap">
                <div className="lp-overview">
                    <div>
                        <p className="lp-kicker">What Speedo is</p>
                        <h2 className="lp-display">
                            A clear record of where a vehicle went, and how it was driven.
                        </h2>
                        <p className="lp-lead">
                            Speedo is a website for trip tracking. It does not need a special device in the vehicle.
                            Bring a phone, or bring a GPS file.
                        </p>
                    </div>
                    <ol className="lp-overview-list">
                        {POINTS.map((point) => (
                            <li key={point.title}>
                                <span className="lp-overview-icon" aria-hidden="true">{point.icon}</span>
                                <div>
                                    <h3>{point.title}</h3>
                                    <p>{point.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default OverviewSection;
