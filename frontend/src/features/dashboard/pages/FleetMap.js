import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const FleetMap = () => {
    return (_jsxs("div", { className: "dashboard-card", style: { textAlign: 'center', padding: '60px 20px' }, children: [_jsx("div", { style: {
                    display: 'inline-flex',
                    padding: '24px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    marginBottom: '24px'
                }, children: _jsx(LocalShippingIcon, { style: { fontSize: 64, color: '#3b82f6' } }) }), _jsx("h2", { className: "card-title", style: { fontSize: '28px', marginBottom: '12px' }, children: "Fleet Map Overview" }), _jsx("p", { className: "card-subtitle", style: { maxWidth: '600px', margin: '0 auto 32px' }, children: "A high-level geographical view of your entire vehicle fleet. Analyze route density, coverage areas, and optimize deployment." }), _jsx("div", { style: { display: 'flex', justifyContent: 'center', gap: '12px' }, children: _jsx("span", { style: {
                        padding: '8px 16px',
                        background: '#DBEAFE',
                        color: '#3b82f6',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 600
                    }, children: "Development in Progress" }) })] }));
};
export default FleetMap;
