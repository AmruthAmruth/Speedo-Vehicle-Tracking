import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import BenefitsSection from '../components/BenefitsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import '../styles/landing.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <BenefitsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
