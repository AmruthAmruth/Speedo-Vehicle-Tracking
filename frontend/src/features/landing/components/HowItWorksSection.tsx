import React from 'react';

const STEPS = [
    {
        number: '01',
        title: 'Add the GPS',
        text: 'Share location from a phone, or upload a CSV of latitude, longitude, and time.',
    },
    {
        number: '02',
        title: 'Speedo reads the points',
        text: 'The points are lined up into one trip. Distance, speed, idle, stops, and overspeed are worked out for you.',
    },
    {
        number: '03',
        title: 'Read the summary',
        text: 'Open the trip and see the numbers in plain language, without building a spreadsheet.',
    },
    {
        number: '04',
        title: 'Follow it on the map',
        text: 'Trace the route, the places it stopped, and the moments it went too fast.',
    },
];

const HowItWorksSection: React.FC = () => {
    return (
        <section className="lp-section" id="how-it-works">
            <div className="lp-wrap">
                <div className="lp-section-head">
                    <p className="lp-kicker">How it works</p>
                    <h2 className="lp-display">Four steps, from a location to a trip you can read</h2>
                    <p className="lp-lead">
                        You do not need to know how GPS math works. Add the points, then look at the result.
                    </p>
                </div>
                <div className="lp-steps">
                    {STEPS.map((step) => (
                        <article className="lp-step" key={step.number}>
                            <div className="lp-step-num">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
