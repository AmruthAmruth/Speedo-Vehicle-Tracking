import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Full-screen loading spinner used during route transitions,
 * auth state checks, and React.lazy Suspense boundaries.
 */
const LoadingScreen = () => {
    return (_jsx("div", { className: "flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full border-4 border-slate-200 border-t-black animate-spin", role: "status", "aria-label": "Loading" }), _jsx("p", { className: "text-sm font-semibold text-slate-400 uppercase tracking-widest animate-pulse", children: "Loading..." })] }) }));
};
export default LoadingScreen;
