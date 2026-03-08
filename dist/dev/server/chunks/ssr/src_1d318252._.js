module.exports = [
"[project]/src/app/pictures/list.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([]);}),
"[project]/src/app/pictures/components/random-layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RandomLayout",
    ()=>RandomLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-center.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/config/site-content.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-size.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const buildUrlList = (pictures)=>{
    const result = [];
    for (const [index, picture] of pictures.entries()){
        if (picture.image) {
            result.push({
                url: picture.image,
                groupIndex: index,
                description: picture.description,
                uploadedAt: picture.uploadedAt,
                pictureId: picture.id,
                imageIndex: 'single'
            });
        }
        if (picture.images && picture.images.length > 0) {
            result.push(...picture.images.map((url, imageIndex)=>({
                    url,
                    groupIndex: index,
                    description: picture.description,
                    uploadedAt: picture.uploadedAt,
                    pictureId: picture.id,
                    imageIndex: imageIndex
                })));
        }
    }
    return result;
};
let lastZIndex = 10;
const TOP_Z_INDEX = 9999;
const formatUploadedAt = (uploadedAt)=>{
    if (!uploadedAt) return '';
    const date = new Date(uploadedAt);
    if (Number.isNaN(date.getTime())) return uploadedAt;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const loadSavedOffset = (url)=>{
    try {
        const saved = localStorage.getItem(`picture-offset-${url}`);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                x: parsed.x || 0,
                y: parsed.y || 0
            };
        }
    } catch (error) {
        console.error('Failed to load saved offset:', error);
    }
    return {
        x: 0,
        y: 0
    };
};
const saveOffset = (url, offset)=>{
    try {
        localStorage.setItem(`picture-offset-${url}`, JSON.stringify(offset));
    } catch (error) {
        console.error('Failed to save offset:', error);
    }
};
const FloatingImage = ({ url, index, groupIndex, position, description, uploadedAt, pictureId, imageIndex, isEditMode, onDeleteSingle, onDeleteGroup })=>{
    const { centerX, centerY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const { maxSM, init } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$size$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])();
    const bodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(document.body);
    const mouseDownTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [zIndex, setZIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(index);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragOffset, setDragOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>loadSavedOffset(url));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>{
            setShow(true);
        }, 200 * index);
    }, []);
    const [originalSize, setOriginalSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const displaySize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!originalSize) {
            return {
                width: 200,
                height: 200
            };
        }
        const ratio = originalSize.width / originalSize.height;
        const minRatio = 2 / 3;
        const maxRatio = 3 / 2;
        const clampedRatio = Math.min(Math.max(ratio, minRatio), maxRatio);
        const baseWidth = 200;
        return {
            width: baseWidth,
            height: baseWidth / clampedRatio
        };
    }, [
        originalSize
    ]);
    const zoomedSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!originalSize) {
            return {
                width: 200,
                height: 200
            };
        }
        if ("TURBOPACK compile-time truthy", 1) {
            return originalSize;
        }
        //TURBOPACK unreachable
        ;
        const padding = undefined;
        const maxWidth = undefined;
        const maxHeight = undefined;
        const scale = undefined;
    }, [
        originalSize
    ]);
    const [isZoomed, setIsZoomed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dragStartOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    if (!position || !show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isZoomed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                onClick: ()=>{
                    setIsZoomed(false);
                },
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    duration: 0.3
                },
                style: {
                    zIndex: TOP_Z_INDEX
                },
                className: "bg-card fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl"
            }, void 0, false, {
                fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                lineNumber: 198,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                drag: !isZoomed,
                dragConstraints: bodyRef,
                dragMomentum: false,
                onDragStart: ()=>{
                    if (!isZoomed) {
                        dragStartOffsetRef.current = {
                            ...dragOffset
                        };
                    }
                },
                onMouseDown: (event)=>{
                    lastZIndex = lastZIndex + 1;
                    setZIndex(lastZIndex);
                    mouseDownTimeRef.current = event.timeStamp;
                },
                onMouseUp: (event)=>{
                    if (mouseDownTimeRef.current !== null) {
                        const duration = event.timeStamp - mouseDownTimeRef.current;
                        if (duration <= 150) {
                            if (!isZoomed) {
                                setIsZoomed(true);
                            } else if (maxSM) {
                                setIsZoomed(false);
                            }
                        }
                    }
                    mouseDownTimeRef.current = null;
                },
                onDragEnd: (_, info)=>{
                    if (!isZoomed) {
                        const newOffset = {
                            x: dragStartOffsetRef.current.x + info.offset.x,
                            y: dragStartOffsetRef.current.y + info.offset.y
                        };
                        setDragOffset(newOffset);
                        saveOffset(url, newOffset);
                    }
                },
                initial: {
                    width: displaySize.width,
                    height: displaySize.height,
                    borderWidth: 8,
                    zIndex,
                    left: centerX + position.x,
                    top: centerY + position.y,
                    rotate: position.rotation,
                    scale: 0.6,
                    opacity: 0,
                    x: dragOffset.x,
                    y: dragOffset.y
                },
                animate: isZoomed ? {
                    zIndex: TOP_Z_INDEX,
                    left: centerX,
                    top: centerY,
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    y: 0,
                    width: zoomedSize.width,
                    height: zoomedSize.height,
                    borderWidth: maxSM ? 12 : 24
                } : {
                    zIndex,
                    scale: 1,
                    opacity: 1,
                    left: centerX + position.x,
                    top: centerY + position.y,
                    rotate: position.rotation,
                    x: dragOffset.x,
                    y: dragOffset.y,
                    width: displaySize.width,
                    height: displaySize.height,
                    borderWidth: 8
                },
                transition: {
                    type: 'tween',
                    ease: 'easeOut'
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('pointer-events-auto absolute origin-center -translate-1/2 cursor-pointer shadow-xl transition-[scale]', !isEditMode && !isZoomed && 'hover:scale-105'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].img, {
                        src: url,
                        onLoad: (event)=>{
                            const img = event.currentTarget;
                            setOriginalSize({
                                width: img.naturalWidth,
                                height: img.naturalHeight
                            });
                        },
                        draggable: false,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('h-full w-full object-cover select-none')
                    }, void 0, false, {
                        fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                        lineNumber: 293,
                        columnNumber: 5
                    }, ("TURBOPACK compile-time value", void 0)),
                    isEditMode && !isZoomed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            scale: 0.8
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            onDeleteSingle?.(pictureId, imageIndex);
                        },
                        onMouseUp: (e)=>{
                            e.stopPropagation();
                        },
                        className: "absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-105 hover:bg-red-600",
                        style: {
                            zIndex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-3 w-3 text-white",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                                lineNumber: 316,
                                columnNumber: 8
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                            lineNumber: 315,
                            columnNumber: 7
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                        lineNumber: 303,
                        columnNumber: 6
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                lineNumber: 209,
                columnNumber: 4
            }, ("TURBOPACK compile-time value", void 0)),
            isZoomed && description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                drag: true,
                dragConstraints: maxSM ? undefined : bodyRef,
                dragMomentum: false,
                className: "fixed min-h-[150px] w-[200px] cursor-pointer p-6 shadow",
                style: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"].backgroundColors[groupIndex % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$site$2d$content$2e$json__$28$json$29$__["default"].backgroundColors.length],
                    zIndex: TOP_Z_INDEX + 1,
                    right: maxSM ? 12 : centerX / 3,
                    top: maxSM ? 12 : centerY
                },
                initial: {
                    opacity: 0,
                    scale: 0.4
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-secondary mb-2 text-xs",
                        children: formatUploadedAt(uploadedAt)
                    }, void 0, false, {
                        fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                        lineNumber: 336,
                        columnNumber: 6
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                        lineNumber: 337,
                        columnNumber: 6
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                lineNumber: 323,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
// 基于唯一标识生成稳定的位置
// 使用 ref 存储稳定的位置映射
const positionCacheRef = new Map();
const getStablePosition = (uniqueId, width, height)=>{
    // 如果已有缓存，直接返回
    if (positionCacheRef.has(uniqueId)) {
        return positionCacheRef.get(uniqueId);
    }
    // 使用 uniqueId 的哈希值来生成稳定的索引
    let hash = 0;
    for(let i = 0; i < uniqueId.length; i++){
        const char = uniqueId.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    const stableIndex = Math.abs(hash) % 10000;
    const maxRadius = Math.min(width, height) / 2 - 100;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    // 使用稳定索引来计算位置，而不是数组索引
    const t = stableIndex % 1000 / 1000;
    const radius = Math.pow(t, 0.8) * maxRadius;
    const angle = stableIndex * goldenAngle;
    const baseX = radius * Math.cos(angle);
    const baseY = radius * Math.sin(angle);
    // 使用 uniqueId 生成稳定的 jitter，确保每次都是相同的位置
    const jitterSeed = Math.abs(hash) % 1000;
    const jitterRadius = 12;
    const jitterX = jitterSeed % (jitterRadius * 2) - jitterRadius;
    const jitterY = jitterSeed * 7 % (jitterRadius * 2) - jitterRadius;
    const rotation = jitterSeed * 13 % 60 - 30;
    const position = {
        x: baseX + jitterX,
        y: baseY + jitterY,
        rotation
    };
    positionCacheRef.set(uniqueId, position);
    return position;
};
const RandomLayout = ({ pictures, isEditMode = false, onDeleteSingle, onDeleteGroup })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterInit"])();
    const { width, height } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$center$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCenterStore"])();
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setTimeout(()=>{
            setShow(true);
        }, 1000);
    }, []);
    const urls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>buildUrlList(pictures), [
        pictures
    ]);
    const pictureMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        pictures.forEach((picture)=>{
            map.set(picture.id, picture);
        });
        return map;
    }, [
        pictures
    ]);
    if (!urls.length || !width || !height) {
        return null;
    }
    if (!show) return null;
    lastZIndex = urls.length + 11;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: urls.map((item, index)=>{
            const picture = pictureMap.get(item.pictureId);
            const uniqueId = item.url;
            const position = getStablePosition(uniqueId, width, height);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingImage, {
                url: item.url,
                index: index,
                groupIndex: item.groupIndex,
                position: position,
                description: item.description,
                uploadedAt: item.uploadedAt,
                pictureId: item.pictureId,
                imageIndex: item.imageIndex,
                isEditMode: isEditMode,
                onDeleteSingle: onDeleteSingle,
                onDeleteGroup: picture ? ()=>onDeleteGroup?.(picture) : undefined
            }, uniqueId, false, {
                fileName: "[project]/src/app/pictures/components/random-layout.tsx",
                lineNumber: 428,
                columnNumber: 6
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false);
};
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
"[project]/src/app/pictures/components/upload-dialog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadDialog
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
function UploadDialog({ onClose, onSubmit }) {
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileSelect = (e)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const nextImages = [];
        for (const file of files){
            if (!file.type.startsWith('image/')) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请选择图片文件');
                return;
            }
            const previewUrl = URL.createObjectURL(file);
            nextImages.push({
                type: 'file',
                file,
                previewUrl
            });
        }
        setImages(nextImages);
    };
    const handleSubmit = ()=>{
        if (images.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请至少选择一张图片');
            return;
        }
        onSubmit({
            images,
            description
        });
        setImages([]);
        setDescription('');
        onClose();
    };
    const handleClose = ()=>{
        images.forEach((image)=>{
            if (image.type === 'file') {
                URL.revokeObjectURL(image.previewUrl);
            }
        });
        setImages([]);
        setDescription('');
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogModal"], {
        open: true,
        onClose: handleClose,
        className: "card w-md max-sm:w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold",
                    children: "上传图片"
                }, void 0, false, {
                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                    lineNumber: 72,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-secondary mb-2 block text-sm font-medium",
                            children: "选择图片（可多选）"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 75,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: fileInputRef,
                            type: "file",
                            accept: "image/*",
                            multiple: true,
                            className: "hidden",
                            onChange: handleFileSelect
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 76,
                            columnNumber: 6
                        }, this),
                        images.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>fileInputRef.current?.click(),
                            className: "flex h-32 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-secondary/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "mx-auto mb-1 h-8 w-8 text-gray-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                        lineNumber: 83,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-secondary text-xs",
                                        children: "点击选择图片"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                        lineNumber: 84,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                lineNumber: 82,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 79,
                            columnNumber: 7
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex h-40 items-center justify-center overflow-visible rounded-xl bg-linear-to-br from-gray-50 to-gray-100",
                                    children: [
                                        images.slice(0, 3).map((image, index)=>image.type === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute h-32 w-44 overflow-hidden rounded-xl border-4 border-white bg-white shadow-xl transition-transform ${index === 0 ? '-left-4 -translate-y-2 -rotate-6' : index === 1 ? 'z-20 rotate-1' : 'right-0 translate-y-2 rotate-6'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: image.previewUrl,
                                                    alt: `preview-${index}`,
                                                    className: "h-full w-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 12
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                                lineNumber: 92,
                                                columnNumber: 11
                                            }, this) : null),
                                        images.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-4 -bottom-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white shadow-lg",
                                            children: [
                                                "共 ",
                                                images.length,
                                                " 张"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                            lineNumber: 103,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                    lineNumber: 89,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-secondary text-xs",
                                            children: [
                                                "已选择 ",
                                                images.length,
                                                " 张图片"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                            lineNumber: 108,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-50",
                                            children: "继续添加"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                                    lineNumber: 107,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                    lineNumber: 74,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-secondary mb-2 block text-sm font-medium",
                            children: "描述（可选，应用于本次所有图片）"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 121,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: description,
                            onChange: (e)=>setDescription(e.target.value),
                            placeholder: "这组图片的说明...",
                            className: "w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none",
                            rows: 3
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 122,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                    lineNumber: 120,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleClose,
                            className: "flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                            children: "取消"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 132,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleSubmit,
                            className: "brand-btn flex-1 justify-center px-4",
                            children: "确认上传"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                            lineNumber: 138,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
                    lineNumber: 131,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
            lineNumber: 71,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pictures/components/upload-dialog.tsx",
        lineNumber: 70,
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
"[project]/src/app/pictures/services/push-pictures.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pushPictures",
    ()=>pushPictures
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
async function pushPictures(params) {
    const { pictures, imageItems } = params;
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthToken"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在获取分支信息...');
    const refData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`);
    const latestCommitSha = refData.sha;
    const commitMessage = `更新图床列表`;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在准备文件...');
    const treeItems = [];
    const uploadedHashes = new Set();
    let updatedPictures = [
        ...pictures
    ];
    if (imageItems && imageItems.size > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在上传图片...');
        for (const [key, imageItem] of imageItems.entries()){
            if (imageItem.type === 'file') {
                const hash = imageItem.hash || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashFileSHA256"])(imageItem.file);
                const ext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFileExt"])(imageItem.file.name);
                const filename = `${hash}${ext}`;
                const publicPath = `/images/pictures/${filename}`;
                if (!uploadedHashes.has(hash)) {
                    const path = `public/images/pictures/${filename}`;
                    const contentBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$file$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fileToBase64NoPrefix"])(imageItem.file);
                    const blobData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, contentBase64, 'base64');
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: blobData.sha
                    });
                    uploadedHashes.add(hash);
                }
                const [groupId, indexStr] = key.split('::');
                const imageIndex = Number(indexStr) || 0;
                updatedPictures = updatedPictures.map((p)=>{
                    if (p.id !== groupId) return p;
                    const currentImages = p.images && p.images.length > 0 ? p.images : p.image ? [
                        p.image
                    ] : [];
                    const nextImages = currentImages.map((img, idx)=>idx === imageIndex ? publicPath : img);
                    return {
                        ...p,
                        image: undefined,
                        images: nextImages
                    };
                });
            }
        }
    }
    // 收集当前所有使用的图片 URL
    const currentImageUrls = new Set();
    for (const picture of updatedPictures){
        if (picture.image) {
            currentImageUrls.add(picture.image);
        }
        if (picture.images && picture.images.length > 0) {
            picture.images.forEach((url)=>currentImageUrls.add(url));
        }
    }
    // 读取之前的 list.json，找出不再使用的图片文件
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在检查需要删除的文件...');
    const previousListJson = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readTextFileFromRepo"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, 'src/app/pictures/list.json', __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH);
    if (previousListJson) {
        try {
            const previousPictures = JSON.parse(previousListJson);
            const previousImageUrls = new Set();
            for (const picture of previousPictures){
                if (picture.image) {
                    previousImageUrls.add(picture.image);
                }
                if (picture.images && picture.images.length > 0) {
                    picture.images.forEach((url)=>previousImageUrls.add(url));
                }
            }
            // 找出不再使用的图片 URL
            for (const url of previousImageUrls){
                if (!currentImageUrls.has(url) && url.startsWith('/images/pictures/')) {
                    // 这是一个本地图片文件，需要删除
                    const filename = url.replace('/images/pictures/', '');
                    const path = `public/images/pictures/${filename}`;
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: null
                    });
                }
            }
        } catch (error) {
            console.error('Failed to parse previous list.json:', error);
        }
    }
    const picturesJson = JSON.stringify(updatedPictures, null, '\t');
    const picturesBlob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBlob"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBase64Utf8"])(picturesJson), 'base64');
    treeItems.push({
        path: 'src/app/pictures/list.json',
        mode: '100644',
        type: 'blob',
        sha: picturesBlob.sha
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建文件树...');
    const treeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTree"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, treeItems, latestCommitSha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在创建提交...');
    const commitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createCommit"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, commitMessage, treeData.sha, [
        latestCommitSha
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('正在更新分支...');
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$github$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateRef"])(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].OWNER, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].REPO, `heads/${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$consts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GITHUB_CONFIG"].BRANCH}`, commitData.sha);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('发布成功！');
}
}),
"[project]/src/app/pictures/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$list$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/app/pictures/list.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$components$2f$random$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pictures/components/random-layout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$components$2f$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pictures/components/upload-dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$services$2f$push$2d$pictures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pictures/services/push-pictures.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(home)/stores/config-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
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
;
function Page() {
    const [pictures, setPictures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$list$2e$json__$28$json$29$__["default"]);
    const [originalPictures, setOriginalPictures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$list$2e$json__$28$json$29$__["default"]);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageItems, setImageItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    const keyInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuth, setPrivateKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuthStore"])();
    const { siteContent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$home$292f$stores$2f$config$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useConfigStore"])();
    const hideEditButton = siteContent.hideEditButton ?? false;
    const handleUploadSubmit = ({ images, description })=>{
        const now = new Date().toISOString();
        if (images.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('请至少选择一张图片');
            return;
        }
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const desc = description.trim() || undefined;
        const imageUrls = images.map((imageItem)=>imageItem.type === 'url' ? imageItem.url : imageItem.previewUrl);
        const newPicture = {
            id,
            uploadedAt: now,
            description: desc,
            images: imageUrls
        };
        const newMap = new Map(imageItems);
        images.forEach((imageItem, index)=>{
            if (imageItem.type === 'file') {
                newMap.set(`${id}::${index}`, imageItem);
            }
        });
        setPictures((prev)=>[
                ...prev,
                newPicture
            ]);
        setImageItems(newMap);
        setIsUploadDialogOpen(false);
    };
    const handleDeleteSingleImage = (pictureId, imageIndex)=>{
        setPictures((prev)=>{
            return prev.map((picture)=>{
                if (picture.id !== pictureId) return picture;
                // 如果是 single image，删除整个 Picture
                if (imageIndex === 'single') {
                    return null;
                }
                // 如果是 images 数组中的图片
                if (picture.images && picture.images.length > 0) {
                    const newImages = picture.images.filter((_, idx)=>idx !== imageIndex);
                    // 如果删除后数组为空，删除整个 Picture
                    if (newImages.length === 0) {
                        return null;
                    }
                    return {
                        ...picture,
                        images: newImages
                    };
                }
                return picture;
            }).filter((p)=>p !== null);
        });
        // 更新 imageItems Map
        setImageItems((prev)=>{
            const next = new Map(prev);
            if (imageIndex === 'single') {
                // 删除所有相关的文件项
                for (const key of next.keys()){
                    if (key.startsWith(`${pictureId}::`)) {
                        next.delete(key);
                    }
                }
            } else {
                // 删除特定索引的文件项
                next.delete(`${pictureId}::${imageIndex}`);
                // 重新索引：删除索引 imageIndex 后，后面的索引需要前移
                // 例如：删除索引 1，原来的索引 2 变成 1，索引 3 变成 2
                const keysToUpdate = [];
                for (const key of next.keys()){
                    if (key.startsWith(`${pictureId}::`)) {
                        const [, indexStr] = key.split('::');
                        const oldIndex = Number(indexStr);
                        if (!isNaN(oldIndex) && oldIndex > imageIndex) {
                            const newIndex = oldIndex - 1;
                            keysToUpdate.push({
                                oldKey: key,
                                newKey: `${pictureId}::${newIndex}`
                            });
                        }
                    }
                }
                // 执行重新索引
                for (const { oldKey, newKey } of keysToUpdate){
                    const value = next.get(oldKey);
                    if (value) {
                        next.set(newKey, value);
                        next.delete(oldKey);
                    }
                }
            }
            return next;
        });
    };
    const handleDeleteGroup = (picture)=>{
        if (!confirm('确定要删除这一组图片吗？')) return;
        setPictures((prev)=>prev.filter((p)=>p.id !== picture.id));
        setImageItems((prev)=>{
            const next = new Map(prev);
            for (const key of next.keys()){
                if (key.startsWith(`${picture.id}::`)) {
                    next.delete(key);
                }
            }
            return next;
        });
    };
    const handleChoosePrivateKey = async (file)=>{
        try {
            const text = await file.text();
            setPrivateKey(text);
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$services$2f$push$2d$pictures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pushPictures"])({
                pictures,
                imageItems
            });
            setOriginalPictures(pictures);
            setImageItems(new Map());
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
        setPictures(originalPictures);
        setImageItems(new Map());
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
                fileName: "[project]/src/app/pictures/page.tsx",
                lineNumber: 222,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$components$2f$random$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RandomLayout"], {
                pictures: pictures,
                isEditMode: isEditMode,
                onDeleteSingle: handleDeleteSingleImage,
                onDeleteGroup: handleDeleteGroup
            }, void 0, false, {
                fileName: "[project]/src/app/pictures/page.tsx",
                lineNumber: 234,
                columnNumber: 4
            }, this),
            pictures.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-secondary flex min-h-screen items-center justify-center text-center text-sm",
                children: "还没有上传图片，点击右上角「编辑」后即可开始上传。"
            }, void 0, false, {
                fileName: "[project]/src/app/pictures/page.tsx",
                lineNumber: 237,
                columnNumber: 5
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
                            onClick: ()=>router.push('/image-toolbox'),
                            className: "rounded-xl border bg-blue-50 px-4 py-2 text-sm text-blue-700",
                            children: "压缩工具"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/page.tsx",
                            lineNumber: 245,
                            columnNumber: 7
                        }, this),
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
                            fileName: "[project]/src/app/pictures/page.tsx",
                            lineNumber: 252,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            onClick: ()=>setIsUploadDialogOpen(true),
                            className: "rounded-xl border bg-white/60 px-6 py-2 text-sm",
                            children: "上传"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pictures/page.tsx",
                            lineNumber: 260,
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
                            fileName: "[project]/src/app/pictures/page.tsx",
                            lineNumber: 267,
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
                    className: "rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80",
                    children: "编辑"
                }, void 0, false, {
                    fileName: "[project]/src/app/pictures/page.tsx",
                    lineNumber: 273,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pictures/page.tsx",
                lineNumber: 242,
                columnNumber: 4
            }, this),
            isUploadDialogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pictures$2f$components$2f$upload$2d$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setIsUploadDialogOpen(false),
                onSubmit: handleUploadSubmit
            }, void 0, false, {
                fileName: "[project]/src/app/pictures/page.tsx",
                lineNumber: 284,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=src_1d318252._.js.map