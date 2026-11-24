import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tripApi } from '../../../services/tripApi';
import { validateCSVFile } from '../../../utils/tripUtils';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DescriptionIcon from '@mui/icons-material/Description';
import { toast } from 'react-toastify';
const TripUpload = () => {
    const [file, setFile] = useState(null);
    const [tripName, setTripName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };
    const handleFileSelect = (selectedFile) => {
        const validation = validateCSVFile(selectedFile);
        if (!validation.valid) {
            setUploadError(validation.error || 'Invalid file');
            return;
        }
        setFile(selectedFile);
        setUploadError(null);
        setUploadSuccess(false);
    };
    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!file)
            return;
        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);
            const response = await tripApi.uploadTrip(file, tripName);
            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadSuccess(true);
            toast.success('Trip uploaded successfully!');
            // Redirect to trip details after 2 seconds
            setTimeout(() => {
                navigate(`/dashboard/trips/${response.tripId}`);
            }, 2000);
        }
        catch (error) {
            let message = 'Failed to upload trip';
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message || message;
            }
            else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message);
            setUploadError(message);
            setUploadProgress(0);
        }
        finally {
            setUploading(false);
        }
    };
    const resetUpload = () => {
        setFile(null);
        setTripName('');
        setUploadSuccess(false);
        setUploadError(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (_jsx("div", { className: "trip-upload", children: _jsxs("div", { className: "dashboard-card", style: { maxWidth: '800px', margin: '0 auto' }, children: [_jsx("div", { className: "card-header", children: _jsxs("div", { children: [_jsx("h3", { className: "card-title", children: "Upload GPS Trip Data" }), _jsx("p", { className: "card-subtitle", children: "Upload a CSV file containing GPS coordinates and timestamps" })] }) }), _jsxs("div", { className: `upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => !file && fileInputRef.current?.click(), style: {
                        border: `2px dashed ${dragActive ? '#667eea' : '#cbd5e0'}`,
                        borderRadius: '12px',
                        padding: '60px 20px',
                        textAlign: 'center',
                        cursor: file ? 'default' : 'pointer',
                        background: dragActive ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                        transition: 'all 0.3s ease',
                        marginBottom: '24px',
                    }, children: [_jsx("input", { ref: fileInputRef, type: "file", accept: ".csv", onChange: handleFileInputChange, style: { display: 'none' } }), !file ? (_jsxs(_Fragment, { children: [_jsx(CloudUploadIcon, { style: { fontSize: 64, color: '#cbd5e0', marginBottom: '16px' } }), _jsx("h4", { style: { fontSize: '18px', fontWeight: 600, color: '#2d3748', margin: '0 0 8px 0' }, children: "Drop your CSV file here" }), _jsx("p", { style: { fontSize: '14px', color: '#718096', margin: '0 0 16px 0' }, children: "or click to browse" }), _jsx("p", { style: { fontSize: '12px', color: '#a0aec0', margin: 0 }, children: "Maximum file size: 10MB" })] })) : (_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }, children: [_jsx(DescriptionIcon, { style: { fontSize: 48, color: '#667eea' } }), _jsxs("div", { style: { textAlign: 'left' }, children: [_jsx("h4", { style: { fontSize: '16px', fontWeight: 600, color: '#2d3748', margin: '0 0 4px 0' }, children: file.name }), _jsxs("p", { style: { fontSize: '14px', color: '#718096', margin: 0 }, children: [(file.size / 1024).toFixed(2), " KB"] })] })] }))] }), file && !uploadSuccess && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("label", { htmlFor: "tripName", style: {
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#4a5568',
                                marginBottom: '8px'
                            }, children: "Trip Name (Optional)" }), _jsx("input", { id: "tripName", type: "text", placeholder: "Enter a name for this trip (e.g. Office Commute)", value: tripName, onChange: (e) => setTripName(e.target.value), disabled: uploading, style: {
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                background: uploading ? '#f7fafc' : 'white'
                            }, onFocus: (e) => e.target.style.borderColor = '#667eea', onBlur: (e) => e.target.style.borderColor = '#e2e8f0' })] })), uploading && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }, children: [_jsx("span", { style: { fontSize: '14px', color: '#718096' }, children: "Uploading..." }), _jsxs("span", { style: { fontSize: '14px', fontWeight: 600, color: '#667eea' }, children: [uploadProgress, "%"] })] }), _jsx("div", { style: { width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }, children: _jsx("div", { style: {
                                    width: `${uploadProgress}%`,
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    transition: 'width 0.3s ease',
                                } }) })] })), uploadSuccess && (_jsxs("div", { style: {
                        padding: '16px',
                        background: '#f0fdf4',
                        border: '1px solid #86efac',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                    }, children: [_jsx(CheckCircleIcon, { style: { color: '#22c55e' } }), _jsxs("div", { children: [_jsx("h4", { style: { fontSize: '14px', fontWeight: 600, color: '#166534', margin: '0 0 4px 0' }, children: "Upload Successful!" }), _jsx("p", { style: { fontSize: '13px', color: '#15803d', margin: 0 }, children: "Redirecting to trip details..." })] })] })), uploadError && (_jsxs("div", { style: {
                        padding: '16px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                    }, children: [_jsx(ErrorIcon, { style: { color: '#ef4444' } }), _jsxs("div", { children: [_jsx("h4", { style: { fontSize: '14px', fontWeight: 600, color: '#991b1b', margin: '0 0 4px 0' }, children: "Upload Failed" }), _jsx("p", { style: { fontSize: '13px', color: '#b91c1c', margin: 0 }, children: uploadError })] })] })), _jsxs("div", { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' }, children: [file && !uploadSuccess && (_jsxs(_Fragment, { children: [_jsx("button", { className: "btn-secondary", onClick: resetUpload, disabled: uploading, children: "Cancel" }), _jsx("button", { className: "btn-primary", onClick: handleUpload, disabled: uploading, children: uploading ? 'Uploading...' : 'Upload Trip' })] })), uploadSuccess && (_jsx("button", { className: "btn-primary", onClick: resetUpload, children: "Upload Another Trip" }))] }), _jsxs("div", { style: {
                        marginTop: '32px',
                        padding: '20px',
                        background: '#f7fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                    }, children: [_jsx("h4", { style: { fontSize: '14px', fontWeight: 600, color: '#2d3748', margin: '0 0 12px 0' }, children: "CSV Format Requirements" }), _jsx("p", { style: { fontSize: '13px', color: '#718096', margin: '0 0 8px 0' }, children: "Your CSV file should contain the following columns:" }), _jsxs("ul", { style: { fontSize: '13px', color: '#718096', margin: '0', paddingLeft: '20px' }, children: [_jsx("li", { children: "latitude (decimal degrees)" }), _jsx("li", { children: "longitude (decimal degrees)" }), _jsx("li", { children: "timestamp (ISO 8601 format)" }), _jsx("li", { children: "ignition (ON/OFF)" })] })] })] }) }));
};
export default TripUpload;
