import React from 'react';
import RouteIcon from '@mui/icons-material/Route';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MapIcon from '@mui/icons-material/Map';

const FEATURES = [
    {
        icon: <RouteIcon />,
        tone: 'tone-green',
        title: 'Distance',
        text: 'The length of the path, measured from the GPS points in order.',
    },
    {
        icon: <SpeedIcon />,
        tone: 'tone-blue',
        title: 'Speed',
        text: 'Average speed and the fastest moment, so a trip is more than a start and end time.',
    },
    {
        icon: <LocalParkingIcon />,
        tone: 'tone-amber',
        title: 'Idling',
        text: 'Time the vehicle stayed almost still. Useful when fuel is being used without moving.',
    },
    {
        icon: <StopCircleIcon />,
        tone: 'tone-orange',
        title: 'Stops',
        text: 'Where the vehicle stopped, and how long it stayed there.',
    },
    {
        icon: <WarningAmberIcon />,
        tone: 'tone-red',
        title: 'Overspeed',
        text: 'The stretches that went too fast, marked so they are easy to find later.',
    },
    {
        icon: <MapIcon />,
        tone: 'tone-ink',
        title: 'The map',
        text: 'The whole route in one view, with the start, the stops, and the driving in between.',
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="lp-section" id="features">
            <div className="lp-wrap">
                <div className="lp-section-head">
                    <p className="lp-kicker">What you see</p>
                    <h2 className="lp-display">Six things every trip can tell you</h2>
                    <p className="lp-lead">
                        After a trip is in, Speedo fills in the same set of answers. You do not have to calculate them yourself.
                    </p>
                </div>
                <div className="lp-features">
                    {FEATURES.map((feature) => (
                        <article className="lp-feature" key={feature.title}>
                            <div className={`lp-feature-icon ${feature.tone}`} aria-hidden="true">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
