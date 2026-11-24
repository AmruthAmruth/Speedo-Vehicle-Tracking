import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
const ConfirmationModal = ({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, loading = false, danger = false }) => {
    return (_jsxs(Dialog, { open: open, onClose: onCancel, PaperProps: {
            sx: {
                borderRadius: 3,
                padding: 1,
                maxWidth: '400px'
            }
        }, children: [_jsxs(DialogTitle, { sx: { display: 'flex', alignItems: 'center', gap: 1.5 }, children: [danger && _jsx(WarningAmberIcon, { color: "error" }), _jsx(Typography, { variant: "h6", fontWeight: "bold", children: title })] }), _jsx(DialogContent, { children: _jsx(Typography, { variant: "body1", color: "text.secondary", children: message }) }), _jsxs(DialogActions, { sx: { padding: 2, gap: 1 }, children: [_jsx(Button, { onClick: onCancel, disabled: loading, sx: {
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'text.secondary'
                        }, children: cancelText }), _jsx(Button, { onClick: onConfirm, variant: "contained", disabled: loading, sx: {
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            backgroundColor: danger ? '#E53E3E' : '#667eea',
                            '&:hover': {
                                backgroundColor: danger ? '#C53030' : '#5a67d8',
                            }
                        }, children: loading ? 'Processing...' : confirmText })] })] }));
};
export default ConfirmationModal;
