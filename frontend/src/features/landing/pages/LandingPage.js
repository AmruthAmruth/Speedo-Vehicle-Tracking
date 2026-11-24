import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import OverviewSection from '../components/OverviewSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import BenefitsSection from '../components/BenefitsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import '../styles/landing.css';
const LandingPage = () => {
    return (_jsxs("div", { className: "landing-page", children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsx(HeroSection, {}), _jsx(OverviewSection, {}), _jsx(FeaturesSection, {}), _jsx(HowItWorksSection, {}), _jsx(BenefitsSection, {}), _jsx(CTASection, {})] }), _jsx(Footer, {})] }));
};
export default LandingPage;
