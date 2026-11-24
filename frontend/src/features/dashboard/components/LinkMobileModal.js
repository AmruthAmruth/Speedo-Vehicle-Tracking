import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Box, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
const LinkMobileModal = ({ open, onClose, activeTripId }) => {
    const navigate = useNavigate();
    const trackingUrl = activeTripId
        ? `${window.location.origin}/dashboard/track/${activeTripId}`
        : '';
    return (_jsxs(Dialog, { open: open, onClose: onClose, PaperProps: {
            sx: { borderRadius: 4, p: 2, maxWidth: '400px' }
        }, children: [_jsxs(DialogTitle, { sx: { m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx(Typography, { variant: "h6", fontWeight: "bold", children: "Link Mobile Device" }), _jsx(IconButton, { onClick: onClose, children: _jsx(CloseIcon, {}) })] }), _jsx(DialogContent, { children: _jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 2 }, children: [_jsx(Box, { sx: {
                                p: 3,
                                bgcolor: 'white',
                                borderRadius: 4,
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                mb: 3
                            }, children: _jsx(QRCodeSVG, { value: trackingUrl, size: 250, level: "H", includeMargin: true }) }), _jsx(Typography, { variant: "body1", color: "text.primary", fontWeight: "600", gutterBottom: true, children: "Scan to start tracking" }), _jsx(Typography, { variant: "body2", color: "text.secondary", sx: { mb: 3 }, children: "Open your phone camera or QR scanner to link this trip session to your mobile device." }), _jsx(Button, { variant: "contained", fullWidth: true, onClick: () => {
                                onClose();
                                navigate(`/dashboard/trips/${activeTripId}`);
                            }, sx: { borderRadius: 2, py: 1.5, fontWeight: 'bold' }, children: "Open Dashboard View" })] }) })] }));
};
export default LinkMobileModal;
