module.exports = [
"[project]/src/components/star-rating.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function StarRating({ stars }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5",
        children: [
            1,
            2,
            3,
            4,
            5
        ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarIcon, {
                filled: index <= stars
            }, index, false, {
                fileName: "[project]/src/components/star-rating.tsx",
                lineNumber: 5,
                columnNumber: 5
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/star-rating.tsx",
        lineNumber: 3,
        columnNumber: 3
    }, this);
}
function StarIcon({ filled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        className: filled ? 'fill-yellow-400' : 'fill-gray-300',
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }, void 0, false, {
            fileName: "[project]/src/components/star-rating.tsx",
            lineNumber: 14,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/star-rating.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/components/editable-star-rating.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditableStarRating
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
function EditableStarRating({ stars, editable = false, onChange }) {
    const handleClick = (index)=>{
        if (editable && onChange) {
            onChange(index);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5",
        children: [
            1,
            2,
            3,
            4,
            5
        ].map((index)=>{
            const filled = index <= stars;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>handleClick(index),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(editable && 'cursor-pointer'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StarIcon, {
                    filled: filled
                }, void 0, false, {
                    fileName: "[project]/src/components/editable-star-rating.tsx",
                    lineNumber: 24,
                    columnNumber: 7
                }, this)
            }, index, false, {
                fileName: "[project]/src/components/editable-star-rating.tsx",
                lineNumber: 23,
                columnNumber: 6
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/editable-star-rating.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, this);
}
function StarIcon({ filled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(filled ? 'fill-yellow-400' : 'fill-gray-300'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        }, void 0, false, {
            fileName: "[project]/src/components/editable-star-rating.tsx",
            lineNumber: 35,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/editable-star-rating.tsx",
        lineNumber: 34,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogModal",
    ()=>DialogModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function DialogModal({ open, onClose, children, className, disableCloseOnOverlay = false, lockScroll = true, closeOnEsc = true }) {
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!lockScroll || !open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = previous;
        };
    }, [
        lockScroll,
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!closeOnEsc || !open) return;
        const handler = (event)=>{
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handler);
        return ()=>{
            window.removeEventListener('keydown', handler);
        };
    }, [
        closeOnEsc,
        onClose,
        open
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: 'fixed inset-0 z-50 flex items-center justify-center bg-card p-4 backdrop-blur-xl',
            onClick: disableCloseOnOverlay ? undefined : onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.8,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    scale: 0.8,
                    y: 20
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('static', className),
                onClick: (e)=>e.stopPropagation(),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/dialog-modal.tsx",
                lineNumber: 59,
                columnNumber: 6
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/dialog-modal.tsx",
            lineNumber: 53,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/dialog-modal.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this), document.body);
}
}),
"[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AvatarUploadDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function AvatarUploadDialog({ currentAvatar, onClose, onSubmit }) {
    const [urlInput, setUrlInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(currentAvatar || '');
    const [previewFile, setPreviewFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileSelect = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        setPreviewFile({
            file,
            previewUrl
        });
        setUrlInput('');
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (previewFile) {
            onSubmit({
                type: 'file',
                file: previewFile.file,
                previewUrl: previewFile.previewUrl
            });
        } else if (urlInput.trim()) {
            onSubmit({
                type: 'url',
                url: urlInput.trim()
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请上传图片或输入 URL');
            return;
        }
        setPreviewFile(null);
        setUrlInput(currentAvatar || '');
        onClose();
    };
    const handleClose = ()=>{
        if (previewFile) {
            URL.revokeObjectURL(previewFile.previewUrl);
        }
        setPreviewFile(null);
        setUrlInput(currentAvatar || '');
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogModal"], {
        open: true,
        onClose: handleClose,
        className: "card w-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-4 text-xl font-bold",
                children: "选择头像"
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                lineNumber: 70,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-secondary mb-2 block text-sm font-medium",
                                children: "上传图片"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: handleFileSelect
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>fileInputRef.current?.click(),
                                className: "mx-auto flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-secondary/10 transition-colors hover:bg-gray-200",
                                children: previewFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: previewFile.previewUrl,
                                    alt: "preview",
                                    className: "h-full w-full rounded-lg object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                    lineNumber: 80,
                                    columnNumber: 8
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "text-secondary mx-auto mb-1 h-8 w-8"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                            lineNumber: 83,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-secondary text-xs",
                                            children: "点击上传图片"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                            lineNumber: 84,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                    lineNumber: 82,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 76,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 73,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full border-t border-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                    lineNumber: 92,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 91,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex justify-center text-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-secondary rounded-lg bg-white px-4 py-1",
                                    children: "或"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                    lineNumber: 95,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 94,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 90,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-secondary mb-2 block text-sm font-medium",
                                children: "图片 URL"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 100,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "url",
                                value: urlInput,
                                onChange: (e)=>{
                                    setUrlInput(e.target.value);
                                    if (previewFile) {
                                        URL.revokeObjectURL(previewFile.previewUrl);
                                        setPreviewFile(null);
                                    }
                                },
                                placeholder: "https://example.com/avatar.png",
                                className: "focus:ring-brand w-full rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 focus:ring-2 focus:outline-none"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 101,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 99,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "brand-btn flex-1 justify-center rounded-lg px-6 py-2.5",
                                children: "确认"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 117,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleClose,
                                className: "flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 transition-colors hover:bg-gray-50",
                                children: "取消"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                                lineNumber: 120,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                        lineNumber: 116,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
                lineNumber: 72,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/bloggers/components/avatar-upload-dialog.tsx",
        lineNumber: 69,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/bloggers/components/blogger-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BloggerCard",
    ()=>BloggerCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/star-rating.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editable-star-rating.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
// 默认占位图
const FALLBACK_AVATAR = '/images/avatar.png';
function BloggerCard({ blogger, isEditMode = false, onUpdate, onDelete }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { maxSM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const [localBlogger, setLocalBlogger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(blogger);
    const [showAvatarDialog, setShowAvatarDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarItem, setAvatarItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatarError, setAvatarError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleFieldChange = (field, value)=>{
        const updated = {
            ...localBlogger,
            [field]: value
        };
        setLocalBlogger(updated);
        onUpdate?.(updated, blogger, avatarItem || undefined);
    };
    const handleAvatarSubmit = (avatar)=>{
        setAvatarItem(avatar);
        const avatarUrl = avatar.type === 'url' ? avatar.url : avatar.previewUrl;
        const updated = {
            ...localBlogger,
            avatar: avatarUrl
        };
        setLocalBlogger(updated);
        onUpdate?.(updated, blogger, avatar);
        setAvatarError(false); // 重置错误状态
    };
    const handleCancel = ()=>{
        setLocalBlogger(blogger);
        setIsEditing(false);
        setAvatarItem(null);
    };
    const canEdit = isEditMode && isEditing;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.6
        },
        ...maxSM ? {
            animate: {
                opacity: 1,
                scale: 1
            }
        } : {
            whileInView: {
                opacity: 1,
                scale: 1
            }
        },
        className: "card relative block overflow-hidden",
        children: [
            isEditMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3 z-10 flex gap-2",
                children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleCancel,
                            className: "rounded-lg px-2 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600",
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                            lineNumber: 63,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsEditing(false),
                            className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                            children: "完成"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                            lineNumber: 66,
                            columnNumber: 8
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsEditing(true),
                            className: "rounded-lg px-2 py-1.5 text-xs text-blue-400 transition-colors hover:text-blue-600",
                            children: "编辑"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                            lineNumber: 72,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onDelete,
                            className: "rounded-lg px-2 py-1.5 text-xs text-red-400 transition-colors hover:text-red-600",
                            children: "删除"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                            lineNumber: 75,
                            columnNumber: 8
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: avatarError ? FALLBACK_AVATAR : localBlogger.avatar,
                                        alt: localBlogger.name,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-16 w-16 rounded-full object-cover', canEdit && 'cursor-pointer'),
                                        onClick: ()=>canEdit && setShowAvatarDialog(true),
                                        onError: ()=>setAvatarError(true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                        lineNumber: 86,
                                        columnNumber: 7
                                    }, this),
                                    canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ev pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-white",
                                            children: "更换"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                            lineNumber: 95,
                                            columnNumber: 9
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                        lineNumber: 94,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                lineNumber: 85,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        contentEditable: canEdit,
                                        suppressContentEditableWarning: true,
                                        onBlur: (e)=>handleFieldChange('name', e.currentTarget.textContent || ''),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('group-hover:text-brand text-lg font-bold transition-colors focus:outline-none', canEdit && 'cursor-text'),
                                        children: localBlogger.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                        lineNumber: 100,
                                        columnNumber: 7
                                    }, this),
                                    canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        contentEditable: true,
                                        suppressContentEditableWarning: true,
                                        onBlur: (e)=>handleFieldChange('url', e.currentTarget.textContent || ''),
                                        className: "text-secondary mt-1 block max-w-[200px] cursor-text truncate text-xs focus:outline-none",
                                        children: localBlogger.url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                        lineNumber: 108,
                                        columnNumber: 8
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: localBlogger.url,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "text-secondary hover:text-brand mt-1 block max-w-[200px] truncate text-xs hover:underline",
                                        children: localBlogger.url
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                        lineNumber: 116,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                lineNumber: 99,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 84,
                        columnNumber: 5
                    }, this),
                    canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable$2d$star$2d$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        stars: localBlogger.stars,
                        editable: true,
                        onChange: (stars)=>handleFieldChange('stars', stars)
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 128,
                        columnNumber: 6
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$star$2d$rating$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        stars: localBlogger.stars
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 130,
                        columnNumber: 6
                    }, this),
                    canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex gap-2",
                        children: [
                            'recent',
                            'disconnected'
                        ].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>handleFieldChange('status', status),
                                className: `rounded-full px-3 py-1 text-xs transition-colors ${(localBlogger.status ?? 'recent') === status ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`,
                                children: status === 'recent' ? '近期更新' : '长期失联'
                            }, status, false, {
                                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                                lineNumber: 136,
                                columnNumber: 8
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 134,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        contentEditable: canEdit,
                        suppressContentEditableWarning: true,
                        onBlur: (e)=>handleFieldChange('description', e.currentTarget.textContent || ''),
                        onClick: (e)=>{
                            if (!canEdit) {
                                e.preventDefault();
                                setExpanded(!expanded);
                            }
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-3 text-sm leading-relaxed text-gray-600 transition-all duration-300 focus:outline-none', canEdit ? 'cursor-text' : 'cursor-pointer', !canEdit && (expanded ? 'line-clamp-none' : 'line-clamp-3')),
                        children: localBlogger.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                        lineNumber: 149,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                lineNumber: 83,
                columnNumber: 4
            }, this),
            canEdit && showAvatarDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                currentAvatar: localBlogger.avatar,
                onClose: ()=>setShowAvatarDialog(false),
                onSubmit: handleAvatarSubmit
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
                lineNumber: 169,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/bloggers/components/blogger-card.tsx",
        lineNumber: 55,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/bloggers/grid-view.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GridView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$blogger$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/blogger-card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function GridView({ bloggers, isEditMode = false, onUpdate, onDelete }) {
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('recent');
    const filteredBloggers = bloggers.filter((blogger)=>{
        const status = blogger.status ?? 'recent';
        const matchesCategory = status === selectedCategory;
        const matchesSearch = blogger.name.toLowerCase().includes(searchTerm.toLowerCase()) || blogger.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto w-full max-w-7xl px-6 pt-24 pb-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "搜索博主...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "focus:ring-brand mx-auto block w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/grid-view.tsx",
                        lineNumber: 41,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCategory('recent'),
                                className: `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedCategory === 'recent' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                                children: "近期更新"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                                lineNumber: 50,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCategory('disconnected'),
                                className: `rounded-full px-4 py-1.5 text-sm transition-colors ${selectedCategory === 'disconnected' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`,
                                children: "长期失联"
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                                lineNumber: 57,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/grid-view.tsx",
                        lineNumber: 49,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 40,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
                children: filteredBloggers.map((blogger)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$blogger$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BloggerCard"], {
                        blogger: blogger,
                        isEditMode: isEditMode,
                        onUpdate: onUpdate,
                        onDelete: ()=>onDelete?.(blogger)
                    }, blogger.url, false, {
                        fileName: "[project]/src/app/bloggers/grid-view.tsx",
                        lineNumber: 69,
                        columnNumber: 6
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 67,
                columnNumber: 4
            }, this),
            filteredBloggers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center text-gray-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "没有找到相关博主"
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/grid-view.tsx",
                    lineNumber: 75,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/grid-view.tsx",
                lineNumber: 74,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/bloggers/grid-view.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/app/bloggers/components/create-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/avatar-upload-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog-modal.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function CreateDialog({ blogger, onClose, onSave }) {
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        avatar: '',
        url: '',
        description: '',
        stars: 3
    });
    const [showAvatarDialog, setShowAvatarDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (blogger) {
            setFormData(blogger);
        } else {
            setFormData({
                name: '',
                avatar: '',
                url: '',
                description: '',
                stars: 3
            });
        }
    }, [
        blogger
    ]);
    const handleAvatarSubmit = (avatar)=>{
        const avatarUrl = avatar.type === 'url' ? avatar.url : avatar.previewUrl;
        setFormData({
            ...formData,
            avatar: avatarUrl
        });
    };
    const handleSubmit = ()=>{
        if (!formData.name.trim() || !formData.avatar.trim() || !formData.url.trim() || !formData.description.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请填写所有必填项');
            return;
        }
        onSave(formData);
        onClose();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(blogger ? '更新成功' : '添加成功');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogModal"], {
        open: true,
        onClose: onClose,
        className: "card w-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "group relative cursor-pointer",
                                onClick: ()=>setShowAvatarDialog(true),
                                children: formData.avatar ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: formData.avatar,
                                            alt: formData.name,
                                            className: "h-16 w-16 rounded-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                            lineNumber: 71,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white",
                                                children: "更换"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                                lineNumber: 73,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                            lineNumber: 72,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-16 w-16 items-center justify-center rounded-full bg-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-6 w-6 text-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                        lineNumber: 78,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                    lineNumber: 77,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                lineNumber: 68,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.name,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                name: e.target.value
                                            }),
                                        placeholder: "博主名称",
                                        className: "w-full text-lg font-bold focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                        lineNumber: 83,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "url",
                                        value: formData.url,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                url: e.target.value
                                            }),
                                        placeholder: "https://example.com",
                                        className: "text-secondary mt-1 w-full truncate text-xs focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                        lineNumber: 90,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                lineNumber: 82,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 67,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-0.5",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFormData({
                                        ...formData,
                                        stars: index
                                    }),
                                className: "cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    className: index <= formData.stars ? 'fill-yellow-400' : 'fill-gray-300',
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                        lineNumber: 105,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                    lineNumber: 104,
                                    columnNumber: 8
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                                lineNumber: 103,
                                columnNumber: 7
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 101,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: formData.description,
                        onChange: (e)=>setFormData({
                                ...formData,
                                description: e.target.value
                            }),
                        placeholder: "博主介绍...",
                        className: "mt-3 w-full resize-none text-sm leading-relaxed focus:outline-none",
                        rows: 4
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 111,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                lineNumber: 66,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                        children: "取消"
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 122,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "brand-btn flex-1 justify-center px-4",
                        children: blogger ? '保存' : '添加'
                    }, void 0, false, {
                        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                        lineNumber: 125,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                lineNumber: 121,
                columnNumber: 4
            }, this),
            showAvatarDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$avatar$2d$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                currentAvatar: formData.avatar,
                onClose: ()=>setShowAvatarDialog(false),
                onSubmit: handleAvatarSubmit
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
                lineNumber: 130,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/bloggers/components/create-dialog.tsx",
        lineNumber: 64,
        columnNumber: 3
    }, this);
}
}),
"[project]/src/lib/aes256-util.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decrypt",
    ()=>decrypt,
    "encrypt",
    ()=>encrypt
]);
async function encrypt(text, key) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)) // 12字节IV
    ;
    const keyData = await crypto.subtle.digest('SHA-256', enc.encode(key));
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, {
        name: 'AES-GCM'
    }, false, [
        'encrypt'
    ]);
    const encrypted = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
    }, cryptoKey, enc.encode(text));
    // iv + 密文 一起转 base64 方便存储
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...result));
}
async function decrypt(cipherText, key) {
    const data = Uint8Array.from(atob(cipherText), (c)=>c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    const enc = new TextEncoder();
    const keyData = await crypto.subtle.digest('SHA-256', enc.encode(key));
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, {
        name: 'AES-GCM'
    }, false, [
        'decrypt'
    ]);
    const decrypted = await crypto.subtle.decrypt({
        name: 'AES-GCM',
        iv
    }, cryptoKey, encrypted);
    return new TextDecoder().decode(decrypted);
}
}),
"[project]/src/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAllAuthCache",
    ()=>clearAllAuthCache,
    "getAuthToken",
    ()=>getAuthToken,
    "getPemFromCache",
    ()=>getPemFromCache,
    "hasAuth",
    ()=>hasAuth,
    "savePemToCache",
    ()=>savePemToCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aes256-util.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const GITHUB_TOKEN_CACHE_KEY = 'github_token';
const GITHUB_PEM_CACHE_KEY = 'p_info';
function getTokenFromCache() {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        return sessionStorage.getItem(GITHUB_TOKEN_CACHE_KEY);
    } catch  {
        return null;
    }
}
function saveTokenToCache(token) {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.setItem(GITHUB_TOKEN_CACHE_KEY, token);
    } catch (error) {
        console.error('Failed to save token to cache:', error);
    }
}
function clearTokenCache() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.removeItem(GITHUB_TOKEN_CACHE_KEY);
    } catch (error) {
        console.error('Failed to clear token cache:', error);
    }
}
async function getPemFromCache() {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        // 解密缓存中的 pem
        const encryptedPem = sessionStorage.getItem(GITHUB_PEM_CACHE_KEY);
        if (!encryptedPem) return null;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decrypt"])(encryptedPem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
    } catch  {
        return null;
    }
}
async function savePemToCache(pem) {
    if (typeof sessionStorage === 'undefined') return;
    try {
        // 加密 pem 后存储
        const encryptedPem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aes256$2d$util$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encrypt"])(pem, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].ENCRYPT_KEY);
        sessionStorage.setItem(GITHUB_PEM_CACHE_KEY, encryptedPem);
    } catch (error) {
        console.error('Failed to save pem to cache:', error);
    }
}
function clearPemCache() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.removeItem(GITHUB_PEM_CACHE_KEY);
    } catch (error) {
        console.error('Failed to clear pem cache:', error);
    }
}
function clearAllAuthCache() {
    clearTokenCache();
    clearPemCache();
}
async function hasAuth() {
    return !!getTokenFromCache() || !!await getPemFromCache();
}
async function getAuthToken() {
    // 1. 先尝试从缓存获取 token
    const cachedToken = getTokenFromCache();
    if (cachedToken) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('使用缓存的令牌...');
        return cachedToken;
    }
    // 2. 获取私钥（从缓存）
    const privateKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().privateKey;
    if (!privateKey) {
        throw new Error('需要先设置私钥。请使用 useAuth().setPrivateKey()');
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在签发 JWT...');
    const jwt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signAppJwt"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].APP_ID, privateKey);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取安装信息...');
    const installationId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInstallationId"])(jwt, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建安装令牌...');
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createInstallationToken"])(jwt, installationId);
    saveTokenToCache(token);
    return token;
}
}),
"[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
;
;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        isAuth: false,
        privateKey: null,
        setPrivateKey: async (key)=>{
            set({
                isAuth: true,
                privateKey: key
            });
            const { siteContent } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"].getState();
            if (siteContent?.isCachePem) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["savePemToCache"])(key);
            }
        },
        clearAuth: ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearAllAuthCache"])();
            set({
                isAuth: false
            });
        },
        refreshAuthState: async ()=>{
            set({
                isAuth: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAuth"])()
            });
        },
        getAuthToken: async ()=>{
            const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
            get().refreshAuthState();
            return token;
        }
    }));
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPemFromCache"])().then((key)=>{
    if (key) {
        useAuthStore.setState({
            privateKey: key
        });
    }
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasAuth"])().then((isAuth)=>{
    if (isAuth) {
        useAuthStore.setState({
            isAuth
        });
    }
});
}),
"[project]/src/lib/github-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GH_API",
    ()=>GH_API,
    "createBlob",
    ()=>createBlob,
    "createCommit",
    ()=>createCommit,
    "createInstallationToken",
    ()=>createInstallationToken,
    "createTree",
    ()=>createTree,
    "getFileSha",
    ()=>getFileSha,
    "getInstallationId",
    ()=>getInstallationId,
    "getRef",
    ()=>getRef,
    "listRepoFilesRecursive",
    ()=>listRepoFilesRecursive,
    "putFile",
    ()=>putFile,
    "readTextFileFromRepo",
    ()=>readTextFileFromRepo,
    "signAppJwt",
    ()=>signAppJwt,
    "toBase64Utf8",
    ()=>toBase64Utf8,
    "updateRef",
    ()=>updateRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsrsasign/lib/jsrsasign.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const GH_API = 'https://api.github.com';
function handle401Error() {
    if (typeof sessionStorage === 'undefined') return;
    try {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"].getState().clearAuth();
    } catch (error) {
        console.error('Failed to clear auth cache:', error);
    }
}
function handle422Error() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('操作太快了，请操作慢一点');
}
function toBase64Utf8(input) {
    return btoa(unescape(encodeURIComponent(input)));
}
function signAppJwt(appId, privateKeyPem) {
    const now = Math.floor(Date.now() / 1000);
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };
    const payload = {
        iat: now - 60,
        exp: now + 8 * 60,
        iss: appId
    };
    const prv = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KEYUTIL"].getKey(privateKeyPem);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsrsasign$2f$lib$2f$jsrsasign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KJUR"].jws.JWS.sign('RS256', JSON.stringify(header), JSON.stringify(payload), prv);
}
async function getInstallationId(jwt, owner, repo) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/installation`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`installation lookup failed: ${res.status}`);
    const data = await res.json();
    return data.id;
}
async function createInstallationToken(jwt, installationId) {
    const res = await fetch(`${GH_API}/app/installations/${installationId}/access_tokens`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create token failed: ${res.status}`);
    const data = await res.json();
    return data.token;
}
async function getFileSha(token, owner, repo, path, branch) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`get file sha failed: ${res.status}`);
    const data = await res.json();
    return data && data.sha || undefined;
}
async function putFile(token, owner, repo, path, contentBase64, message, branch) {
    const sha = await getFileSha(token, owner, repo, path, branch);
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            content: contentBase64,
            branch,
            ...sha ? {
                sha
            } : {}
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`put file failed: ${res.status}`);
    return res.json();
}
async function getRef(token, owner, repo, ref) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/ref/${encodeURIComponent(ref)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`get ref failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.object.sha
    };
}
async function createTree(token, owner, repo, tree, baseTree) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/trees`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tree,
            base_tree: baseTree
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create tree failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
async function createCommit(token, owner, repo, message, tree, parents) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/commits`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            tree,
            parents
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create commit failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
async function updateRef(token, owner, repo, ref, sha, force = false) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/refs/${encodeURIComponent(ref)}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sha,
            force
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`update ref failed: ${res.status}`);
}
async function readTextFileFromRepo(token, owner, repo, path, ref) {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`read file failed: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) || !data.content) return null;
    try {
        return decodeURIComponent(escape(atob(data.content)));
    } catch  {
        return atob(data.content);
    }
}
async function listRepoFilesRecursive(token, owner, repo, path, ref) {
    async function fetchPath(targetPath) {
        const res = await fetch(`${GH_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(targetPath)}?ref=${encodeURIComponent(ref)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        if (res.status === 401) handle401Error();
        if (res.status === 422) handle422Error();
        if (res.status === 404) return [];
        if (!res.ok) throw new Error(`read directory failed: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            const files = [];
            for (const item of data){
                if (item.type === 'file') {
                    files.push(item.path);
                } else if (item.type === 'dir') {
                    const nested = await fetchPath(item.path);
                    files.push(...nested);
                }
            }
            return files;
        }
        if (data?.type === 'file') return [
            data.path
        ];
        if (data?.type === 'dir') return fetchPath(data.path);
        return [];
    }
    return fetchPath(path);
}
async function createBlob(token, owner, repo, content, encoding = 'base64') {
    const res = await fetch(`${GH_API}/repos/${owner}/${repo}/git/blobs`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            encoding
        })
    });
    if (res.status === 401) handle401Error();
    if (res.status === 422) handle422Error();
    if (!res.ok) throw new Error(`create blob failed: ${res.status}`);
    const data = await res.json();
    return {
        sha: data.sha
    };
}
}),
"[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fileToBase64NoPrefix",
    ()=>fileToBase64NoPrefix,
    "hashFileSHA256",
    ()=>hashFileSHA256,
    "readFileAsText",
    ()=>readFileAsText
]);
'use client';
function readFileAsText(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result || ''));
        reader.onerror = reject;
        reader.readAsText(file);
    });
}
function fileToBase64NoPrefix(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            const dataUrl = String(reader.result || '');
            resolve(dataUrl.replace(/^data:[^;]+;base64,/, ''));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
async function hashFileSHA256(file) {
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const bytes = new Uint8Array(digest);
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        const h = bytes[i].toString(16).padStart(2, '0');
        hex += h;
    }
    return hex.slice(0, 16);
}
}),
"[project]/src/app/bloggers/services/push-bloggers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushBloggers",
    ()=>pushBloggers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/github-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/file-utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/consts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
async function pushBloggers(params) {
    const { bloggers, avatarItems } = params;
    // 获取认证 token（自动从全局认证状态获取）
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新博主列表`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    const uploadedHashes = new Set();
    let updatedBloggers = [
        ...bloggers
    ];
    // Process avatar uploads
    if (avatarItems && avatarItems.size > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在上传头像...');
        for (const [url, avatarItem] of avatarItems.entries()){
            if (avatarItem.type === 'file') {
                const hash = avatarItem.hash || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(avatarItem.file);
                const ext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileExt"])(avatarItem.file.name);
                const filename = `${hash}${ext}`;
                const publicPath = `/images/blogger/${filename}`;
                if (!uploadedHashes.has(hash)) {
                    const path = `public/images/blogger/${filename}`;
                    const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(avatarItem.file);
                    const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: blobData.sha
                    });
                    uploadedHashes.add(hash);
                }
                // Update blogger avatar URL
                updatedBloggers = updatedBloggers.map((b)=>b.url === url ? {
                        ...b,
                        avatar: publicPath
                    } : b);
            }
        }
    }
    // Create blob for bloggers list.json
    const bloggersJson = JSON.stringify(updatedBloggers, null, '\t');
    const bloggersBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBase64Utf8"])(bloggersJson), 'base64');
    treeItems.push({
        path: 'src/app/bloggers/list.json',
        mode: '100644',
        type: 'blob',
        sha: bloggersBlob.sha
    });
    // Create tree
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    // Create commit
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    // Update branch reference
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('发布成功！');
}
}),
"[project]/src/app/bloggers/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"name\":\"阮一峰的网络日志\",\"avatar\":\"/images/blogger/fe25259da8e3609b.png\",\"url\":\"https://www.ruanyifeng.com/blog/archives.html\",\"description\":\"经典必看，每周更新。无聊是看新闻、还是学习、还是拓展眼界，都是能其中获取到乐趣的。还有很多网友的每周留言。这就是 blog 的含金量。\",\"stars\":5},{\"name\":\"Enji Kusnadi\",\"url\":\"https://enji.dev/\",\"avatar\":\"https://enji.dev/_next/image?url=%2Fassets%2Fimages%2Fme.png&w=1080&q=100\",\"description\":\"第一个在设计样式上惊艳我的人，那时每逢推荐别人blog，我都会提这么一嘴。但这个不算她的blog 网站，只算它的线上简历，没有持续的内容，比较可惜。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Josh W. Comeau\",\"url\":\"https://www.joshwcomeau.com/\",\"avatar\":\"https://www.joshwcomeau.com/favicon.png\",\"description\":\"John blog 更像是一个课程网站，每一篇文章都书写的很好，每次阅读都能吸收到新的东西。网站设计也恰到好处，工整、有趣。\",\"stars\":5},{\"name\":\"nanda\",\"url\":\"https://www.nan.fyi/\",\"avatar\":\"https://www.nan.fyi/favicon.ico\",\"description\":\"设计大师，nanda 。页面只用灰色加线条，都让我觉得叹为观止，内容不多，每篇都精雕细琢。跟 Josh 一样，属于技术网站，但它的教程引导更加出神入化，可称为程序艺术家。\",\"stars\":5},{\"name\":\"Emil Kowalski\",\"url\":\"https://emilkowal.ski/\",\"avatar\":\"https://emilkowal.ski/favicon.ico\",\"description\":\"Blog 就干脆\\\"不设计\\\"，无装饰。技术就比较轻松一些，它更强调动画/交互。Vercel 员工，他的组件很好用，也很 vercel。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Risingle\",\"url\":\"https://www.imrising.cn/\",\"avatar\":\"https://www.imrising.cn/images/logo/logo.webp\",\"description\":\"网站样式很棒，虽然用的别人的模板，但是他用的很棒。是个初出茅庐的程序员。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"無名小栈\",\"url\":\"https://blog.imsyy.top/\",\"avatar\":\"https://blog.imsyy.top/images/logo/logo.webp\",\"description\":\"Risingle blog 的模板主人，或许是头像和网站风格不搭，显得没有 Risingle 的舒服。Github 热门项目还不少，一看就是爱折腾的人，就是不爱写 blog，没啥内容。01 年，挺年轻的，独立开发者？不知道经历了什么。\",\"stars\":2,\"status\":\"disconnected\"},{\"name\":\"韩小韩博客\",\"url\":\"https://www.vvhan.com/\",\"avatar\":\"https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640\",\"description\":\"网站很棒，内容多，头像也帅，不知道人帅不帅。就是这个错位滑动效果一直让我头疼，这个阻尼效果还写blog专业上了。。。一个插件导入的事情，啥时候他能把这个效果关掉就好了。挺想多看下他内容的，但是这个效果太头晕了。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Anthony Fu\",\"url\":\"https://antfu.me/\",\"avatar\":\"https://avatars.githubusercontent.com/u/11247099?v=4\",\"description\":\"很厉害的一个人，好像还很年轻。经常在 b站活跃，开直播（看过）。我记得它几乎毕业就做了很多厉害的事情，vue 系列核心成员，似乎对他来说很轻松的事情。blog 多是英文，生活圈也是大神汇聚，真好。不怎么爱写blog，但相比来说已经算好的了。可以从他这窥探一些 vue \\\"上流社会\\\"\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"enpitsulin 铅笔\",\"url\":\"https://enpitsulin.xyz/\",\"avatar\":\"https://enpitsulin.dev/images/avatar.webp\",\"description\":\"很简洁的blog网站，像 nanda。只不过很久没内容了。他现在的头像一时让我想不起他是谁了，突然发现它过去可爱头像，我想起来这家伙了。\",\"stars\":2},{\"name\":\"Innei 静かな森\",\"url\":\"https://innei.in/\",\"avatar\":\"https://cdn.jsdelivr.net/gh/Innei/static@master/avatar.png\",\"description\":\"网站还行，是典型的那种某个时代的产物，我不太get。但是内容活跃，并且他好像很火？但我没找出他为什么火。项目还是挺多的。\",\"stars\":3},{\"name\":\"秋夜灯雨\",\"url\":\"https://blog.lierhua.top/\",\"avatar\":\"https://blog.lierhua.top/images/web/yyqda3.svg\",\"description\":\"看名字，就知道是过去的残党了。但是我挺喜欢他的设计的，页面清晰，一股书生气。虽然是老人，但能追溯的过去并不多。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"BlogFinder\",\"url\":\"https://bf.zzxworld.com/\",\"avatar\":\"https://bf.zzxworld.com/images/favicon.png\",\"description\":\"一个 blog 收集网站，可以查阅有哪些 blog，也可以直接看最近谁更新了什么\",\"stars\":3},{\"name\":\"Tonsky\",\"url\":\"https://tonsky.me/\",\"avatar\":\"https://avatars.githubusercontent.com/u/285292?v=4\",\"description\":\"一个过去的国外大神，忘了是什么时候发现它的，blog 依旧时不时更新。就是现在 blog 太刺眼了，不知道是不是故意的。\",\"stars\":3},{\"name\":\"Cali\",\"url\":\"https://cali.so/\",\"avatar\":\"https://cali.so/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPortrait.8d12f14a.png&w=96&q=75\",\"description\":\"设计师，网站设计不错，但是 blog 内容很少。但厉害的是他已经自己开公司了，给别人设计网站，影石 Insta360 是他们设计的。很好的 blog 参考。他的 zolplay 网站跟 nanda 风格很像，不知道谁抄的谁。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Chrome Blog\",\"url\":\"https://web.dev/blog?hl=zh-cn\",\"avatar\":\"/images/blogger/2fe46db88bd43683.svg\",\"description\":\"技术团队 blog，咨询、动态、故事。我觉得页面感受还不错。\",\"stars\":4},{\"name\":\"Huozhi\",\"url\":\"https://huozhi.im/\",\"avatar\":\"https://avatars.githubusercontent.com/u/4800338?v=4\",\"description\":\"极简主义者，网站真的极简，但是感觉也不差。内容不多，当你觉得不知道怎么设计blog，或者设计的不好时，看看他。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"Brian Lovin\",\"url\":\"https://brianlovin.com/\",\"avatar\":\"https://avatars.githubusercontent.com/u/1923260?v=4\",\"description\":\"早期外国大神，在 Github,Facebook 工作过，现在在notion，资历老、项目多。blog 写成了 Dashboard 风格，蛮奇特的，但是 blog 并不多。\",\"stars\":4},{\"name\":\"Cassie Evans's Blog\",\"url\":\"https://www.cassie.codes/\",\"avatar\":\"https://www.cassie.codes/images/avatar2.jpg\",\"description\":\"彩色网站，真的很酷。并且还是位女士，真的很少见。GASP、SVG、动画很精美，但是没几篇内容，也算是高级 blog 的一种诅咒。在 Twitter 上也是名人。\",\"stars\":4,\"status\":\"disconnected\"},{\"name\":\"Niracler 的博物志\",\"url\":\"https://niracler.com/\",\"avatar\":\"https://niracler.com/favicon.svg\",\"description\":\"小透明，偶尔更新一篇blog。但是网站风格还是有特点的，可作为设计 blog 时的参考。\",\"stars\":2},{\"name\":\"講評世界\",\"url\":\"https://blog.moeyua.com/\",\"avatar\":\"https://avatars.githubusercontent.com/u/45156493?v=4\",\"description\":\"小透明，失踪人口。但 blog 网站样式有种字体的美，不知道怎么说。好像是影视飓风成员。\",\"stars\":2,\"status\":\"disconnected\"},{\"name\":\"阿猫的博客\",\"url\":\"https://ameow.xyz/\",\"avatar\":\"https://ameow.xyz/upload/favicon.png\",\"description\":\"可爱的网站，一直在更新他的猫鱼周刊。\",\"stars\":3},{\"name\":\"pseudoyu\",\"url\":\"https://www.pseudoyu.com/\",\"avatar\":\"https://www.pseudoyu.com/avatar.webp\",\"description\":\"区块链开发者，在 Monad 区块链倒腾了一段时间。网站长得跟 Anthony 一模一样。嘴上一直念叨着他的学姐老婆。应该也挺厉害的。\",\"stars\":3},{\"name\":\"季节记忆\",\"avatar\":\"https://www.seamory.com/api/storage/2024112814523200000001349b3aa3c2\",\"url\":\"https://www.seamory.com/\",\"description\":\"好像是为后端/嵌入式？2025 年初建立的 blog，无 UI 设计。但少有后端人显露 blog，应当勉励的。\",\"stars\":1,\"status\":\"disconnected\"},{\"name\":\"微尔微\",\"avatar\":\"https://www.vio.vin/apple-touch-icon.png\",\"url\":\"https://www.vio.vin/\",\"description\":\"23 年新晋散修，如他所说，一天倒腾一些奇怪的东西。应该是以后端为主，喜欢完一些硬件。静森系 blog，25年 blog 稳定输出。\",\"stars\":2},{\"name\":\"搬砖日记\",\"avatar\":\"https://banzhuanriji.com/img/icon.ico\",\"url\":\"https://banzhuanriji.com/\",\"description\":\"白底黑字。但是打理得挺好的。应该是 Andriod 开发者，24 年开始分享各种探索。摸不清根底。\",\"stars\":2},{\"name\":\"博客.cn\",\"avatar\":\"https://xmind.design/favicon.ico\",\"url\":\"https://loud-fear-11e.notion.site/eb29a49346a742989582723f950fcf0f?v=4b4f7b7d24274ba7853426c101a149d7\",\"description\":\"好像是 XMind 的内部 blog notion，不确认，但里面的内容确实专业深刻，先收藏一波\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"KK\",\"avatar\":\"https://avatars.githubusercontent.com/u/44634134?v=4\",\"url\":\"https://kaiyi.cool/\",\"description\":\"kk 是跟很厉害的人。突然看朋友圈想起他了，发现他是有 blog 的，虽然已经不维护了。但他的 blog 还残留一些好东西，或许对你有帮助。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"猫普的精神世界\",\"avatar\":\"https://maplezz.com/_astro/picture.DavLO-HP_1hhoaS.webp\",\"url\":\"https://maplezz.com/\",\"description\":\"通过 issue 发现的另外一个开源的，也是这几天开源的，好巧。液态玻璃感设计，是有这种感觉，挺好的，就是有的花。我还是挺喜欢的。内容从 25年开始。\",\"stars\":3},{\"name\":\"手里有只毛毛虫\",\"avatar\":\"https://www.krjojo.com/wp-content/uploads/2024/05/avatar.avif\",\"url\":\"https://www.krjojo.com/\",\"description\":\"网站很舒服，一位六边形战士的独立开发者。文章目录能一眼看完就好了，想翻点想看的比较不容易。\",\"stars\":4},{\"name\":\"Honesty\",\"avatar\":\"https://cdn.jsdelivr.net/gh/listener-He/images@default/202309111525908.jpeg\",\"url\":\"https://blog.hehouhui.cn/\",\"description\":\"折腾 blog 的后端，是个后端学习的榜样，折腾了这么多年。网站弄得还挺好的，就是加载内容有点慢。\",\"stars\":3},{\"name\":\"ElysiumStack\",\"avatar\":\"/images/avatar.png\",\"url\":\"https://www.elysium-stack.cn/\",\"description\":\"UI 设计师 blogger，少见，blog 设计的很棒。一股游戏感铺面而来，25 年开始的内容。\",\"stars\":3},{\"name\":\"十玖八柒\",\"avatar\":\"https://ahzoo.cn/img/avatar.webp\",\"url\":\"https://blog.ahzoo.cn/\",\"description\":\"Z次元，后端开发，记录了很多后端研究。但折腾前端和 blog 还不少。把 blog 打理得有自己独特得舒适，实属难得\",\"stars\":3},{\"name\":\"纸鹿摸鱼处\",\"avatar\":\"https://weavatar.com/avatar/47c0f2e82b76d9b10eb3023df9e02e4e3fdbeaf5b74b842063f207971e7fbe7b?s=160\",\"url\":\"https://blog.zhilu.site/\",\"description\":\"棒棒的开源 blog 主，今天蹭了蹭他群友，🤣，给他多加一分🤣🤣🤣。\",\"stars\":4},{\"name\":\"灯火不休时\",\"avatar\":\"https://file.dhbxs.top/ylvwvjjs.jpg\",\"url\":\"https://blog.dhbxs.top/\",\"description\":\"群友，JAVAR，干净blog，让我看到几个人的影子。\",\"stars\":3,\"status\":\"disconnected\"},{\"name\":\"23朵毒蘑菇\",\"avatar\":\"https://blog.dumogu.top/web-assets/v-last/public/user.jpg\",\"url\":\"https://blog.dumogu.top/\",\"description\":\"前端开发，页面小巧，结构简单，寻常记录\",\"stars\":3}]"));}),
"[project]/src/app/bloggers/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$grid$2d$view$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/grid-view.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/components/create-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$services$2f$push$2d$bloggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/services/push-bloggers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/bloggers/list.json (json)");
'use client';
;
;
;
;
;
;
;
;
;
;
function Page() {
    const [bloggers, setBloggers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__["default"]);
    const [originalBloggers, setOriginalBloggers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$list$2e$json__$28$json$29$__["default"]);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingBlogger, setEditingBlogger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarItems, setAvatarItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const hideEditButton = siteContent.hideEditButton ?? false;
    const handleUpdate = (updatedBlogger, oldBlogger, avatarItem)=>{
        setBloggers((prev)=>prev.map((b)=>b.url === oldBlogger.url ? updatedBlogger : b));
        if (avatarItem) {
            setAvatarItems((prev)=>{
                const newMap = new Map(prev);
                newMap.set(updatedBlogger.url, avatarItem);
                return newMap;
            });
        }
    };
    const handleAdd = ()=>{
        setEditingBlogger(null);
        setIsCreateDialogOpen(true);
    };
    const handleSaveBlogger = (updatedBlogger)=>{
        if (editingBlogger) {
            const updated = bloggers.map((b)=>b.url === editingBlogger.url ? updatedBlogger : b);
            setBloggers(updated);
        } else {
            setBloggers([
                ...bloggers,
                updatedBlogger
            ]);
        }
    };
    const handleDelete = (blogger)=>{
        if (confirm(`确定要删除 ${blogger.name} 吗？`)) {
            setBloggers(bloggers.filter((b)=>b.url !== blogger.url));
        }
    };
    const handleChoosePrivateKey = async (file)=>{
        try {
            const text = await file.text();
            setPrivateKey(text);
            // 选择文件后自动保存
            await handleSave();
        } catch (error) {
            console.error('Failed to read private key:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('读取密钥文件失败');
        }
    };
    const handleSaveClick = ()=>{
        if (!isAuth) {
            keyInputRef.current?.click();
        } else {
            handleSave();
        }
    };
    const handleSave = async ()=>{
        setIsSaving(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$services$2f$push$2d$bloggers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pushBloggers"])({
                bloggers,
                avatarItems
            });
            setOriginalBloggers(bloggers);
            setAvatarItems(new Map());
            setIsEditMode(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('保存成功！');
        } catch (error) {
            console.error('Failed to save:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`保存失败: ${error?.message || '未知错误'}`);
        } finally{
            setIsSaving(false);
        }
    };
    const handleCancel = ()=>{
        setBloggers(originalBloggers);
        setAvatarItems(new Map());
        setIsEditMode(false);
    };
    const buttonText = isAuth ? '保存' : '导入密钥';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (!isEditMode && (e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                setIsEditMode(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        isEditMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: keyInputRef,
                type: "file",
                accept: ".pem",
                className: "hidden",
                onChange: async (e)=>{
                    const f = e.target.files?.[0];
                    if (f) await handleChoosePrivateKey(f);
                    if (e.currentTarget) e.currentTarget.value = '';
                }
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 124,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$grid$2d$view$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                bloggers: bloggers,
                isEditMode: isEditMode,
                onUpdate: handleUpdate,
                onDelete: handleDelete
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 136,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    scale: 0.6
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                className: "absolute top-4 right-6 flex gap-3 max-sm:hidden",
                children: isEditMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleCancel,
                            disabled: isSaving,
                            className: "rounded-xl border bg-white/60 px-6 py-2 text-sm",
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 141,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleAdd,
                            className: "rounded-xl border bg-white/60 px-6 py-2 text-sm",
                            children: "添加"
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 149,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: handleSaveClick,
                            disabled: isSaving,
                            className: "brand-btn px-6",
                            children: isSaving ? '保存中...' : buttonText
                        }, void 0, false, {
                            fileName: "[project]/src/app/bloggers/page.tsx",
                            lineNumber: 156,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true) : !hideEditButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                    whileHover: {
                        scale: 1.05
                    },
                    whileTap: {
                        scale: 0.95
                    },
                    onClick: ()=>setIsEditMode(true),
                    className: "bg-card rounded-xl border px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80",
                    children: "编辑"
                }, void 0, false, {
                    fileName: "[project]/src/app/bloggers/page.tsx",
                    lineNumber: 162,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 138,
                columnNumber: 4
            }, this),
            isCreateDialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$bloggers$2f$components$2f$create$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                blogger: editingBlogger,
                onClose: ()=>setIsCreateDialogOpen(false),
                onSave: handleSaveBlogger
            }, void 0, false, {
                fileName: "[project]/src/app/bloggers/page.tsx",
                lineNumber: 173,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_e39973f1._.js.map